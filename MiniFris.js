// Powered By Frisbee.githuh.io
class TextEditor extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({
            mode: 'open'
        });

        shadow.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <style>
        #text-editor-container {
          width: 100%;
          max-width: 425px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          background-color: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Raleway', sans-serif;
          overflow: hidden;
        }
        #editor-toolbar {
          display: flex;
          justify-content: space-between;
          background-color: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
          padding: 8px;
        }
        #editor-toolbar button {
          background-color: #e5e7eb;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        #editor-toolbar button:hover {
          background-color: #2b86c5;
          color: #ffffff;
        }
        #editor-toolbar select {
          background-color: #e5e7eb;
          border: none;
          border-radius: 4px;
          width: 80px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        #searchbar {
          display: flex;
          justify-content: space-between;
          background-color: #f9fafb;
          border-top: 2px solid #e5e7eb;
          padding: 8px;
        }
        #searchbar button {
          background-color: #e5e7eb;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        #searchbar button:hover {
          background-color: #2b86c5;
          color: #ffffff;
        }
        #searchbar input {
          padding: 2px;
          font-size: 1rem;
          line-height: 1;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        #text-editor {
          min-height: 200px;
          max-height: 400px;
          padding: 15px;
          font-size: 1rem;
          line-height: 1.5;
          border: none;
          outline: none;
          overflow-y: auto;
        }
        #text-editor::-webkit-scrollbar {
          width: 8px;
        }
        #text-editor::-webkit-scrollbar-thumb {
          background-color: #c4c4c4;
          border-radius: 4px;
        }
        #text-editor::-webkit-scrollbar-thumb:hover {
          background-color: #a9a9a9;
        }
        mark.highlighted-text {
          background-color: yellow;
          color: black;
        }
      </style>
      <div id="text-editor-container">
        <div id="editor-toolbar">
          <button data-command="bold"> <i class="fa-solid fa-bold"></i></button>
          <button data-command="italic"> <i class="fa-solid fa-italic"></i></button>
          <button data-command="underline"> <i class="fa-solid fa-underline"></i></button>
          <button data-command="strikeThrough"> <i class="fa-solid fa-strikethrough"></i></button>
          <button data-command="insertOrderedList"> <i class="fa-solid fa-list-ol"></i></button>
          <button data-command="insertUnorderedList"> <i class="fa-solid fa-list-ul"></i></button>
          <button data-command="undo"> <i class="fa-solid fa-undo"></i></button>
          <button data-command="redo"> <i class="fa-solid fa-redo"></i></button>
          <select id="font-family-select">
            <option value="Raleway, sans-serif">Raleway</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Courier New, monospace">Courier New</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Tahoma, sans-serif">Tahoma</option>
            <option value="Verdana, sans-serif">Verdana</option>
          </select>
        </div>
        <div id="text-editor" contenteditable="true" spellcheck="false">
          Start typing here...
        </div>
        <div id="searchbar">
          <input type="text" id="search-input" placeholder="Search..." />
          <button id="search-button">Search</button>
        </div>
      </div>
    `;

        const textEditorContent = shadow.getElementById('text-editor');
        const fontFamilySelect = shadow.getElementById('font-family-select');

        shadow.querySelectorAll('#editor-toolbar button').forEach((button) => {
            button.addEventListener('click', () => {
                const command = button.getAttribute('data-command');
                document.execCommand(command, false, null);
            });
        });

        fontFamilySelect.addEventListener('change', (event) => {
            const selectedFont = event.target.value;
            textEditorContent.style.fontFamily = selectedFont;
        });

        const searchInputField = shadow.getElementById("search-input");
        const searchActionButton = shadow.getElementById("search-button");

        searchActionButton.addEventListener("click", () => {
            const queryTerm = searchInputField.value.trim();
            textEditorContent.innerHTML = textEditorContent.innerHTML.replace(/<mark class="highlighted-text">(.*?)<\/mark>/g, "$1");

            if (queryTerm) {
                const searchPattern = new RegExp(`(${queryTerm})`, "gi");
                textEditorContent.innerHTML = textEditorContent.innerHTML.replace(searchPattern, '<mark class="highlighted-text">$1</mark>');
            }
        });
    }

    get content() {
        return this.shadowRoot.querySelector('#text-editor').innerHTML;
    }

    set content(value) {
        this.shadowRoot.querySelector('#text-editor').innerHTML = value;
    }
}

customElements.define('text-editor', TextEditor);
