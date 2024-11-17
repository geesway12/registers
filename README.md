# Clinic Registers

**Clinic Registers** is a progressive web application (PWA) designed to manage custom registers for clinics. Users can create their own registers, define fields, enter data, and export it for further use. The app works offline and supports a variety of field types, ensuring flexibility and usability.

---

## Features

### Core Functionality
- **Create Registers**: Add new registers with customizable fields.
- **Field Types Supported**:
  - `text`: General text input.
  - `integer`: Positive whole numbers only.
  - `decimal`: Positive decimal numbers.
  - `date`: Date picker.
  - `time`: Time picker.
  - `email`: Email input with validation.
  - `telephone`: Validates 10-digit Ghanaian phone numbers.
  - `select_one`: Dropdown for single choice.
  - `select_multiple`: Multi-select dropdown for multiple choices.
  - `multiline`: Text area for long text inputs.
  - `image`: Upload images (stored as Base64).
- **Enter Data**: Input data into registers with real-time validation.
- **Edit Registers**: Update register names or add new fields.
- **Delete Registers**: Remove registers after confirming.
- **Export Data**: Download register data as a CSV file.

### Offline Capability
- Works offline using **IndexedDB** for persistent storage.
- Fully functional without an internet connection.

### Responsive Design
- Optimized for mobile, tablet, and desktop devices.

### Footer Information
- Displays contact information: **0269609634**.
- Automatically updates the current year.

---

## Installation

### Requirements
- A modern web browser (e.g., Chrome, Firefox, Edge).
- No additional software or server is required.

### Steps
1. Clone or download the repository:
   ```bash
   git clone https://github.com/geesway12/clinic-registers.git
   ```
2. Navigate to the project folder:
   ```bash
   cd clinic-registers
   ```
3. Open `index.html` in your browser.

---

## Deployment

### Using Static Hosting
1. Deploy the project to any static hosting platform like:
   - [Netlify](https://www.netlify.com/)
   - [GitHub Pages](https://pages.github.com/)
   - [Vercel](https://vercel.com/)

2. Ensure the files are in the root directory:
   ```
   index.html
   style.css
   app.js
   utils.js
   manifest.json
   service-worker.js
   ```

3. Access the deployed URL to use the app.

---

## Usage

### Adding a Register
1. Click **"Add New Register"**.
2. Enter the register name.
3. Define fields:
   - Enter the field name.
   - Choose a field type (e.g., `text`, `integer`, `select_one`).
   - For `select_one` or `select_multiple`, provide options separated by commas (e.g., `Male,Female`).
4. Save the register.

### Editing a Register
1. Click **"Edit"** next to the register.
2. Update the register name or add new fields.

### Deleting a Register
1. Click **"Delete"** next to the register.
2. Confirm the deletion.

### Entering Data
1. Click on a register to open its form.
2. Fill in the fields.
3. Click **"Submit"** to save the entry.

### Exporting Data
1. Open a register.
2. Click **"Export Data"**.
3. The data will be downloaded as a CSV file.

---

## File Structure

```plaintext
clinic-registers/
├── index.html          # Entry point of the app
├── style.css           # Styling for the app
├── app.js              # Core logic of the app
├── utils.js            # Utility functions (e.g., CSV export)
├── manifest.json       # PWA manifest file
├── service-worker.js   # Service worker for offline functionality
```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Contact

For support or inquiries:
- **Developer**: GS-Digital Solutions
- **Contact**: 0269609634


# clinic-registers
