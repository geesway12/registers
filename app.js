const db = new Dexie("ClinicRegistersDB");
db.version(1).stores({
  registers: "++id,name,fields,data",
});

document.addEventListener("DOMContentLoaded", async () => {
  const registerList = document.getElementById("registers");
  const registerFormSection = document.getElementById("register-form");
  const registerListSection = document.getElementById("register-list");
  const dataEntryForm = document.getElementById("data-entry-form");

  let currentRegisterId = null;

  // Set the current year in the footer
  document.getElementById("year").textContent = new Date().getFullYear();

  const renderRegisters = async () => {
    const registers = await db.registers.toArray();
    registerList.innerHTML = "";
    registers.forEach((register) => {
      const li = document.createElement("li");
      li.textContent = register.name;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent triggering register open
        editRegister(register.id);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent triggering register open
        deleteRegister(register.id);
      });

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      li.addEventListener("click", () => openRegister(register.id));
      registerList.appendChild(li);
    });
  };

  const openRegister = async (id) => {
    currentRegisterId = id;
    const register = await db.registers.get(id);
    registerFormSection.style.display = "block";
    registerListSection.style.display = "none";
    document.getElementById("form-title").textContent = register.name;
    buildDataEntryForm(register);
  };

  const buildDataEntryForm = (register) => {
    dataEntryForm.innerHTML = "";

    register.fields.forEach((field) => {
      let inputContainer;

      switch (field.type) {
        case "integer":
          inputContainer = document.createElement("input");
          inputContainer.type = "number";
          inputContainer.min = 0;
          inputContainer.step = 1;
          break;

        case "decimal":
          inputContainer = document.createElement("input");
          inputContainer.type = "number";
          inputContainer.min = 0;
          inputContainer.step = "any";
          break;

        case "select_one":
          inputContainer = document.createElement("select");
          const placeholderOption = document.createElement("option");
          placeholderOption.value = "";
          placeholderOption.textContent = "Select an option";
          placeholderOption.disabled = true;
          placeholderOption.selected = true;
          inputContainer.appendChild(placeholderOption);

          field.options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            inputContainer.appendChild(optionElement);
          });
          break;

        case "select_multiple":
          inputContainer = document.createElement("select");
          inputContainer.name = field.name;
          inputContainer.multiple = true;
          inputContainer.style.height = "auto";

          field.options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.textContent = option;
            inputContainer.appendChild(optionElement);
          });
          break;

        case "multiline":
          inputContainer = document.createElement("textarea");
          inputContainer.name = field.name;
          inputContainer.rows = 4;
          inputContainer.placeholder = field.name;
          break;

        case "image":
          inputContainer = document.createElement("input");
          inputContainer.type = "file";
          inputContainer.accept = "image/*";
          break;

        default:
          inputContainer = document.createElement("input");
          inputContainer.type = field.type || "text";
      }

      inputContainer.name = field.name;
      inputContainer.placeholder = field.name;
      dataEntryForm.appendChild(inputContainer);
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.type = "button";
    submitBtn.addEventListener("click", () => saveData(register));
    dataEntryForm.appendChild(submitBtn);
  };

  const saveData = async (register) => {
    const data = {};
    for (const field of register.fields) {
      const input = dataEntryForm[field.name];
      let value;

      if (field.type === "image") {
        value = input.files[0] ? await toBase64(input.files[0]) : null;
      } else if (field.type === "select_multiple") {
        const selectedOptions = Array.from(input.selectedOptions);
        value = selectedOptions.map((option) => option.value);
      } else {
        value = input.value.trim();
      }

      if (!value || (field.type === "select_multiple" && value.length === 0)) {
        alert(`${field.name} is required`);
        return;
      }

      data[field.name] = value;
    }

    register.data.push(data);
    await db.registers.put(register);
    alert("Data saved successfully");
    dataEntryForm.reset();
  };

  const exportData = async () => {
    if (!currentRegisterId) {
      alert("No register selected for export.");
      return;
    }

    const register = await db.registers.get(currentRegisterId);
    if (!register.data || register.data.length === 0) {
      alert("No data available for export.");
      return;
    }

    const csvContent = [
      Object.keys(register.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})).join(
        ","
      ), // Headers
      ...register.data.map((row) => Object.values(row).join(",")), // Rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const filename = `${register.name}-${new Date().toISOString().split("T")[0]}.csv`;
    link.download = filename;
    link.click();

    alert(`Data exported as ${filename}`);
  };

  const addRegister = async () => {
    const name = prompt("Enter Register Name");
    if (!name) return;

    const fields = [];
    while (true) {
      const fieldName = prompt("Enter field name or leave blank to finish");
      if (!fieldName) break;

      const fieldType = prompt(
        "Enter field type (text, integer, decimal, date, time, email, telephone, select_one, select_multiple, multiline, image)"
      );
      const field = { name: fieldName, type: fieldType };

      if (fieldType === "select_one" || fieldType === "select_multiple") {
        field.options = prompt("Enter options separated by commas (e.g., Male,Female)").split(",");
      }

      fields.push(field);
    }

    const newRegister = { name, fields, data: [] };
    await db.registers.add(newRegister);
    renderRegisters();
  };

  document.getElementById("add-register-btn").addEventListener("click", addRegister);

  document.getElementById("export-data-btn").addEventListener("click", exportData);

  document.getElementById("back-btn").addEventListener("click", () => {
    registerFormSection.style.display = "none";
    registerListSection.style.display = "block";
    dataEntryForm.innerHTML = ""; // Clear the form
  });

  renderRegisters();
});
