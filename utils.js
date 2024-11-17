const exportToCSV = (data, filename) => {
    const csvContent = [
      Object.keys(data[0]).join(","), // headers
      ...data.map((row) => Object.values(row).join(",")), // rows
    ].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };
  