/**
 * PAC script generation
 */
const Generator = {
  /**
   * Generate PAC script from current configuration
   *
   * @returns {string} Generated PAC script
   */
  generatePacScript() {
    const defaultProxy =
      document.getElementById("defaultProxy")?.value || "DIRECT";
    const rules = Rules.getRules();
    const additionalFunctions =
      document.getElementById("additionalFunctions")?.value || "";

    let script = `// Proxy Auto-Configuration (PAC) file
// Generated: ${new Date().toLocaleString()}

function FindProxyForURL(url, host) {
  // Default values
  var defaultProxy = "${defaultProxy}";
  
  // Convert hostname to lowercase
  host = host.toLowerCase();
  
  // URL in lowercase
  var lUrl = url.toLowerCase();
  
`;

    // Add rules
    let hasRules = false;

    rules.forEach((rule) => {
      switch (rule.type) {
        case "host":
          const host = rule.values.host;
          const hostProxy = rule.values.hostProxy;

          if (host && hostProxy) {
            hasRules = true;
            script += `    // Host rule for ${host}
  if (host === "${host}") {
      return "${hostProxy}";
  }
  
`;
          }
          break;
        case "url":
          const url = rule.values.url;
          const urlProxy = rule.values.urlProxy;

          if (url && urlProxy) {
            hasRules = true;
            script += `    // URL pattern rule for ${url}
  if (shExpMatch(lUrl, "${url}")) {
      return "${urlProxy}";
  }
  
`;
          }
          break;
        case "ip":
          const ip = rule.values.ip;
          const mask = rule.values.mask;
          const ipProxy = rule.values.ipProxy;

          if (ip && mask && ipProxy) {
            hasRules = true;
            script += `    // IP range rule for ${ip}/${mask}
  if (isInNet(host, "${ip}", "${mask}") || isInNet(dnsResolve(host), "${ip}", "${mask}")) {
      return "${ipProxy}";
  }
  
`;
          }
          break;
        case "dnsDomain":
          const domain = rule.values.domain;
          const domainProxy = rule.values.domainProxy;

          if (domain && domainProxy) {
            hasRules = true;
            script += `    // DNS Domain rule for ${domain}
  if (dnsDomainIs(host, "${domain}")) {
      return "${domainProxy}";
  }
  
`;
          }
          break;
      }
    });

    // Add custom functions
    if (additionalFunctions) {
      script += `    // Additional custom logic
${additionalFunctions}
  
`;
    }

    // Default return
    script += `    // Default proxy${
      hasRules ? " (used if no rules match)" : ""
    }
  return defaultProxy;
}`;

    return script;
  },

  /**
   * Download the generated PAC script
   */
  downloadScript() {
    const output = document.getElementById("output").value;
    if (!output) {
      showNotification("Please generate a PAC script first.", "error");
      return;
    }

    const blob = new Blob([output], { type: "application/x-javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "proxy.pac";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification("PAC script downloaded successfully!", "success");
  },

  /**
   * Copy script to clipboard
   */
  copyScriptToClipboard() {
    const output = document.getElementById("output");
    output.select();
    document.execCommand("copy");

    showNotification("PAC script copied to clipboard!", "success");
  },
};

// Add event listeners if we're on the builder page
if (document.getElementById("generateScript")) {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generateScript").addEventListener("click", () => {
      const pacScript = Generator.generatePacScript();
      document.getElementById("output").value = pacScript;
    });

    document
      .getElementById("copyScript")
      .addEventListener("click", Generator.copyScriptToClipboard);
    document
      .getElementById("downloadScript")
      .addEventListener("click", Generator.downloadScript);
  });
}
