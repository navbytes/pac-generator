/**
 * PAC script testing functionality
 */
const Tester = {
  /**
   * Initialize tester
   */
  init() {
    // Test button
    document
      .getElementById("runTest")
      ?.addEventListener("click", this.testPacScript);

    // Load saved configuration button
    document
      .getElementById("loadSavedConfig")
      ?.addEventListener("click", this.showSavedConfigurationsForTest);

    // Load default config button
    document
      .getElementById("loadDefaultConfig")
      ?.addEventListener("click", this.loadDefaultTestConfig);
  },

  /**
   * Test PAC script against a URL
   */
  testPacScript() {
    const testUrl = document.getElementById("testUrl").value;
    const pacScript = document.getElementById("testPacScript").value;

    if (!testUrl) {
      showNotification("Please enter a URL to test", "error");
      return;
    }

    if (!pacScript) {
      showNotification("Please enter a PAC script to test", "error");
      return;
    }

    // Parse URL to extract host
    let host;
    try {
      const url = new URL(testUrl);
      host = url.hostname;
    } catch (e) {
      showNotification("Invalid URL format", "error");
      return;
    }

    // Set up the test environment
    let result;
    let traceLog = [];

    try {
      // Create a sandbox function to execute the PAC script
      const sandboxCode = `
              // Mock PAC functions
              function dnsResolve(h) {
                  traceLog.push("Called dnsResolve(" + h + ")");
                  // Mock DNS resolution - in a real environment, this would resolve the hostname
                  if (h === "www.example.com") return "93.184.216.34";
                  if (h === "intranet.local") return "10.0.0.1";
                  return "192.0.2.1"; // Return a test IP for any other host
              }
              
              function isInNet(h, net, mask) {
                  traceLog.push("Called isInNet(" + h + ", " + net + ", " + mask + ")");
                  // Simplified IP check for testing
                  if (h.startsWith("10.") && net === "10.0.0.0") return true;
                  if (h.startsWith("192.168.") && net === "192.168.0.0") return true;
                  if (h === "93.184.216.34" && net === "93.184.216.0" && mask === "255.255.255.0") return true;
                  return false;
              }
              
              function shExpMatch(str, pattern) {
                  traceLog.push("Called shExpMatch(" + str + ", " + pattern + ")");
                  // Convert pattern to RegExp
                  const regExpPattern = pattern
                      .replace(/\\./g, '\\\\.')
                      .replace(/\\*/g, '.*')
                      .replace(/\\?/g, '.');
                      
                  const regex = new RegExp("^" + regExpPattern + "$");
                  const result = regex.test(str);
                  traceLog.push("shExpMatch result: " + result);
                  return result;
              }
              
              function dnsDomainIs(h, domain) {
                  traceLog.push("Called dnsDomainIs(" + h + ", " + domain + ")");
                  const result = h.endsWith(domain);
                  traceLog.push("dnsDomainIs result: " + result);
                  return result;
              }
              
              function isPlainHostName(h) {
                  traceLog.push("Called isPlainHostName(" + h + ")");
                  const result = h.indexOf('.') === -1;
                  traceLog.push("isPlainHostName result: " + result);
                  return result;
              }
              
              function localHostOrDomainIs(h, hostdom) {
                  traceLog.push("Called localHostOrDomainIs(" + h + ", " + hostdom + ")");
                  const result = h === hostdom || (h.indexOf('.') === -1 && hostdom.indexOf(h) === 0);
                  traceLog.push("localHostOrDomainIs result: " + result);
                  return result;
              }
              
              function isResolvable(h) {
                  traceLog.push("Called isResolvable(" + h + ")");
                  // Mock resolution check
                  return true;
              }
              
              function timeRange() {
                  traceLog.push("Called timeRange()");
                  // Simplified timeRange always returns true for testing
                  return true;
              }
              
              function dateRange() {
                  traceLog.push("Called dateRange()");
                  // Simplified dateRange always returns true for testing
                  return true;
              }
              
              function weekdayRange() {
                  traceLog.push("Called weekdayRange()");
                  // Simplified weekdayRange always returns true for testing
                  return true;
              }
              
              // Add the PAC script
              ${pacScript}
              
              // Call the PAC function
              traceLog.push("Calling FindProxyForURL with URL: ${testUrl}, Host: ${host}");
              const proxyResult = FindProxyForURL("${testUrl}", "${host}");
              traceLog.push("Result: " + proxyResult);
              
              // Return the results
              { proxyResult, traceLog }
          `;

      // Execute the sandbox code
      const sandbox = new Function(
        "traceLog",
        `
              traceLog = [];
              return ${sandboxCode};
          `
      );

      // Run the test
      const testResult = sandbox([]);
      result = testResult.proxyResult;
      traceLog = testResult.traceLog;

      // Display results
      document.getElementById("resultUrl").textContent = testUrl;
      document.getElementById("resultHost").textContent = host;

      // Find which rule matched (look for the last rule checked in the trace)
      let matchedRule = "No specific rule matched";
      for (let i = traceLog.length - 1; i >= 0; i--) {
        const logEntry = traceLog[i];
        if (
          logEntry.includes("Called") &&
          !logEntry.includes("FindProxyForURL")
        ) {
          matchedRule = logEntry;
          break;
        }
      }

      document.getElementById("resultRule").textContent = matchedRule;
      document.getElementById("resultProxy").textContent = result;

      // Display execution trace
      document.getElementById("executionTrace").textContent =
        traceLog.join("\n");

      // Show the results panel and hide the empty state
      document.getElementById("testResults").classList.remove("hidden");
      document.getElementById("noTestResults").classList.add("hidden");
    } catch (e) {
      console.error("Error executing PAC script:", e);
      showNotification("Error executing PAC script: " + e.message, "error");
    }
  },

  /**
   * Show saved configurations modal for testing
   */
  showSavedConfigurationsForTest() {
    const savedConfigModal = document.getElementById("savedConfigModal");
    if (!savedConfigModal) return;

    // Load and display saved configurations
    const savedConfigs = this.getAllConfigurations();
    const savedConfigsList = document.getElementById("savedConfigsList");
    const noSavedConfigs = document.getElementById("noSavedConfigs");

    savedConfigsList.innerHTML = "";

    if (savedConfigs.length === 0) {
      noSavedConfigs.classList.remove("hidden");
      savedConfigsList.classList.add("hidden");
    } else {
      noSavedConfigs.classList.add("hidden");
      savedConfigsList.classList.remove("hidden");

      savedConfigs.forEach((config) => {
        const configItem = document.createElement("div");
        configItem.className =
          "bg-white rounded-lg border border-slate-200 p-4 flex justify-between items-center";

        configItem.innerHTML = `
                  <div>
                      <h3 class="font-medium text-slate-800">${config.name}</h3>
                      <p class="text-sm text-slate-500">Saved on ${new Date(
                        config.savedAt
                      ).toLocaleString()}</p>
                  </div>
                  <div>
                      <button class="use-for-test-btn p-2 text-primary-600 hover:bg-primary-50 rounded" data-config-id="${
                        config.id
                      }" title="Use for Testing">
                          <i class="ri-test-tube-line"></i> Use for Test
                      </button>
                  </div>
              `;

        savedConfigsList.appendChild(configItem);
      });

      // Add event listeners
      document.querySelectorAll(".use-for-test-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const configId = e.currentTarget.getAttribute("data-config-id");
          Tester.loadSavedConfigurationForTest(configId);
          Tester.hideSavedConfigurationsModal();
        });
      });
    }

    savedConfigModal.classList.remove("hidden");
  },

  /**
   * Hide saved configurations modal
   */
  hideSavedConfigurationsModal() {
    const savedConfigModal = document.getElementById("savedConfigModal");
    if (savedConfigModal) {
      savedConfigModal.classList.add("hidden");
    }
  },

  /**
   * Get all saved configurations
   *
   * @returns {Array} Array of configuration objects
   */
  getAllConfigurations() {
    const configsStr = localStorage.getItem("pacConfigurations");
    return configsStr ? JSON.parse(configsStr) : [];
  },

  /**
   * Load saved configuration for testing
   *
   * @param {string} configId - Configuration ID
   */
  loadSavedConfigurationForTest(configId) {
    const configs = this.getAllConfigurations();
    const config = configs.find((c) => c.id === configId);

    if (config) {
      // Generate PAC script from config
      const pacScript = this.generatePacScriptFromConfig(config);
      document.getElementById("testPacScript").value = pacScript;

      showNotification(
        `Configuration "${config.name}" loaded for testing!`,
        "success"
      );
    }
  },

  /**
   * Generate PAC script from configuration
   *
   * @param {Object} config - Configuration object
   * @returns {string} Generated PAC script
   */
  generatePacScriptFromConfig(config) {
    let script = `// Proxy Auto-Configuration (PAC) file
// Generated from "${config.name}"

function FindProxyForURL(url, host) {
  // Default values
  var defaultProxy = "${config.defaultProxy || "DIRECT"}";
  
  // Convert hostname to lowercase
  host = host.toLowerCase();
  
  // URL in lowercase
  var lUrl = url.toLowerCase();
  
`;

    // Add rules
    config.rules.forEach((rule) => {
      switch (rule.type) {
        case "host":
          const host = rule.values.host;
          const hostProxy = rule.values.hostProxy;

          if (host && hostProxy) {
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
    if (config.additionalFunctions) {
      script += `    // Additional custom logic
${config.additionalFunctions}
  
`;
    }

    // Default return
    script += `    // Default proxy
  return defaultProxy;
}`;

    return script;
  },

  /**
   * Load default test configuration
   */
  loadDefaultTestConfig() {
    const defaultPacScript = `function FindProxyForURL(url, host) {
  // Convert hostname to lowercase
  host = host.toLowerCase();
  
  // URL in lowercase
  var lUrl = url.toLowerCase();
  
  // Internal hosts - direct connection
  if (isInNet(host, "10.0.0.0", "255.0.0.0") || 
      isInNet(host, "192.168.0.0", "255.255.0.0")) {
      return "DIRECT";
  }
  
  // Example.com - direct connection
  if (dnsDomainIs(host, ".example.com")) {
      return "DIRECT";
  }
  
  // Secure URLs - special secure proxy
  if (shExpMatch(lUrl, "https://*.secure.com/*")) {
      return "PROXY secureproxy.example.com:8443";
  }
  
  // Default proxy for everything else
  return "PROXY proxy.example.com:8080; DIRECT";
}`;

    document.getElementById("testPacScript").value = defaultPacScript;
    showNotification("Default test PAC script loaded!", "success");
  },
};

// Initialize tester if we're on the tester page
if (document.getElementById("runTest")) {
  document.addEventListener("DOMContentLoaded", () => {
    Tester.init();
  });
}
