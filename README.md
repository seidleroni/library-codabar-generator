# Library Codabar Generator

A simple web application to generate, display, and save Codabar barcodes, frequently used by libraries.

**[Live Application](https://seidleroni.github.io/library-codabar-generator/)**

## Features

*   **Generate Codabar Barcodes:** Create Codabar barcodes from any alphanumeric input.
*   **Optional Labels:** Add a human-readable label to your barcode for easy identification.
*   **Bookmarkable URLs:** The generated barcode and its label are stored in the URL, so you can bookmark the page to save and reuse your barcode.
*   **Responsive Design:** The application is designed to work on both desktop and mobile devices.
*   **Dark Mode:** The application respects your system's theme and will automatically switch to a dark or light theme.

## How to Use

1.  **Enter a value:** Type the value you want to encode into the "Enter value for barcode" field.
2.  **Add a label (optional):** If you want to add a label, type it into the "Enter a label (optional)" field.
3.  **Generate:** Click the "Generate" button.
4.  **Save:** Bookmark the page in your browser to save the generated barcode for future use.

## Development

This project was built with React, Vite, and TypeScript.

### Prerequisites

*   Node.js

### Running Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/seidleroni/library-codabar-generator.git
    ```
2.  Install dependencies:
    ```bash
    cd library-codabar-generator
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```