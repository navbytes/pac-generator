# PAC Script Generator

[PAC Script Generator Logo](https://img.shields.io/badge/PAC-Script%20Generator-0ea5e9.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjIgMTJDMjIgNi40NzcgMTcuNTIzIDIgMTIgMkM2LjQ3NyAyIDIgNi40NzcgMiAxMkMyIDE3LjUyMyA2LjQ3NyAyMiAxMiAyMkMxNy41MjMgMjIgMjIgMTcuNTIzIDIyIDEyWiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTYgMTJINFYxMEgxNkwxMyA3TTggMTRIMjBWMTZIOEwxMSAxOSIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==)

A powerful, user-friendly tool for creating Proxy Auto-Configuration (PAC) scripts for enterprise network environments.

## Overview

PAC Script Generator simplifies the creation and management of Proxy Auto-Configuration (PAC) scripts with an intuitive visual interface. The tool allows network administrators to create complex proxy routing rules without having to write JavaScript code directly.

🌐 **[View Live Demo](https://pac-script-generator.vercel.app)**

## Features

- **Visual Rule Builder**: Create PAC scripts with a user-friendly interface
- **Multiple Rule Types**: Support for host, URL pattern, IP range, and DNS domain rules
- **Rule Testing**: Test your PAC scripts against specific URLs to verify proxy selection
- **Quick Start Templates**: Pre-configured templates for common scenarios
- **Save & Load**: Save your configurations locally and reload them later
- **Comprehensive Documentation**: Built-in reference for PAC script functions and best practices
- **Dark Mode**: Support for light and dark themes
- **Mobile-Friendly**: Responsive design works on all devices

## Screenshots

[Builder Interface](https://via.placeholder.com/800x450.png?text=PAC+Script+Builder)
_Builder Interface - Create rules visually_

[Rule Tester](https://via.placeholder.com/800x450.png?text=Rule+Tester)
_Rule Tester - Verify proxy selection for specific URLs_

[Documentation](https://via.placeholder.com/800x450.png?text=Documentation)
_Comprehensive Documentation - Learn about PAC script functions_

## Getting Started

The PAC Script Generator runs entirely in your browser. No installation or server-side components are required.

1. Visit the [live application](https://pac-script-generator.vercel.app)
2. Choose a quick start template or begin adding rules
3. Configure your default proxy and add specific rules
4. Generate and download your PAC script

## Rule Types

The generator supports the following types of proxy routing rules:

- **Host Rules**: Route traffic for specific hostnames
- **URL Pattern Rules**: Route based on URL patterns with wildcards
- **IP Range Rules**: Route based on destination IP addresses
- **DNS Domain Rules**: Route traffic for a domain and all its subdomains

## Usage Examples

### Corporate Network Setup

Configure internal resources to be accessed directly, while routing external traffic through a corporate proxy:

1. Set default proxy to your corporate proxy
2. Add an IP rule for your internal network (e.g., 10.0.0.0/8) with DIRECT access
3. Add a DNS Domain rule for your internal domain (e.g., .internal.company.com) with DIRECT access

### Geographical Routing

Route traffic to different proxies based on target regions:

1. Set a default global proxy
2. Add DNS Domain rules for each region (e.g., .us.example.com, .eu.example.com)
3. Assign region-specific proxies to each rule

## PAC File Deployment

After generating your PAC script, you can deploy it using one of these methods:

1. **Web Server**: Host the PAC file on a web server with MIME type `application/x-javascript`
2. **Group Policy**: Deploy via Group Policy for Windows environments
3. **WPAD**: Configure Web Proxy Auto-Discovery for automatic distribution
4. **Manual Configuration**: Distribute the file for local configuration in browsers

## Development

### Project Structure

```
/pac-script-generator/
│
├── index.html                # Main builder page
├── tester.html               # Rule tester page
├── documentation.html        # Documentation page
├── about.html                # About page
├── favicon.ico               # Favicon
│
├── css/                      # Styles
│   ├── main.css              # Main styles
│   ├── themes.css            # Theme support
│   └── mobile.css            # Mobile optimizations
│
├── js/                       # JavaScript
│   ├── shared.js             # Shared functionality
│   ├── rules.js              # Rule management
│   ├── generator.js          # PAC script generation
│   ├── storage.js            # Local storage & persistence
│   ├── tester.js             # Rule testing logic
│   └── templates.js          # Rule and quick start templates
│
└── vercel.json               # Vercel deployment configuration
```

### Running Locally

The application is built with vanilla HTML, CSS, and JavaScript. No build steps are required.

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pac-script-generator.git
   ```

2. Open any of the HTML files directly in your browser, or serve using a local development server:

   ```bash
   # Using Python's built-in server
   python -m http.server

   # Or using Node.js with http-server
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Remix Icon](https://remixicon.com/) - For icons
- [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_PAC_file) - For PAC file documentation

## Author

Your Name - [GitHub Profile](https://github.com/yourusername)

---

For questions, issues, or feature requests, please [open an issue](https://github.com/yourusername/pac-script-generator/issues) on GitHub.
