/**
 * Local storage and configuration management
 */
const Storage = {
  /**
   * Initialize storage functionality
   */
  init() {
    // Check for first-time users
    if (!this.getItem("hasVisitedBefore")) {
      this.setItem("hasVisitedBefore", "true");
      document.getElementById("welcomeMessage")?.classList.remove("hidden");
    }

    // Welcome message handlers
    document.getElementById("dismissWelcome")?.addEventListener("click", () => {
      document.getElementById("welcomeMessage").classList.add("hidden");
    });

    // Load configuration buttons
    document
      .getElementById("saveConfiguration")
      ?.addEventListener("click", this.saveCurrentConfiguration);
    document
      .getElementById("loadConfiguration")
      ?.addEventListener("click", this.showSavedConfigurationsModal);

    // Modal close buttons
    document
      .getElementById("closeSavedConfigModal")
      ?.addEventListener("click", this.hideSavedConfigurationsModal);

    // Template buttons
    document
      .getElementById("useTemplate")
      ?.addEventListener("click", Templates.showTemplateModal);
    document
      .getElementById("closeTemplateModal")
      ?.addEventListener("click", Templates.hideTemplateModal);

    // Load any autosaved configuration
    this.loadAutosavedConfiguration();

    // Set up periodic autosave
    if (document.getElementById("defaultProxy")) {
      setInterval(() => {
        const currentConfig = this.getCurrentConfiguration();
        this.setItem("autosaveConfig", JSON.stringify(currentConfig));
      }, 30000); // Save every 30 seconds
    }
  },

  /**
   * Get item from local storage
   *
   * @param {string} key - Storage key
   * @returns {string|null} Stored value or null
   */
  getItem(key) {
    return localStorage.getItem(key);
  },

  /**
   * Set item in local storage
   *
   * @param {string} key - Storage key
   * @param {string} value - Value to store
   */
  setItem(key, value) {
    localStorage.setItem(key, value);
  },

  /**
   * Remove item from local storage
   *
   * @param {string} key - Storage key to remove
   */
  removeItem(key) {
    localStorage.removeItem(key);
  },

  /**
   * Show saved configurations modal
   */
  showSavedConfigurationsModal() {
    const savedConfigModal = document.getElementById("savedConfigModal");
    if (!savedConfigModal) return;

    // Load and display saved configurations
    const savedConfigs = Storage.getAllConfigurations();
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
                  <div class="flex space-x-2">
                      <button class="load-config-btn p-2 text-primary-600 hover:bg-primary-50 rounded" data-config-id="${
                        config.id
                      }" title="Load Configuration">
                          <i class="ri-folder-open-line"></i>
                      </button>
                      <button class="delete-config-btn p-2 text-red-600 hover:bg-red-50 rounded" data-config-id="${
                        config.id
                      }" title="Delete Configuration">
                          <i class="ri-delete-bin-line"></i>
                      </button>
                  </div>
              `;

        savedConfigsList.appendChild(configItem);
      });

      // Add event listeners
      document.querySelectorAll(".load-config-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const configId = e.currentTarget.getAttribute("data-config-id");
          Storage.loadConfigurationById(configId);
          Storage.hideSavedConfigurationsModal();
        });
      });

      document.querySelectorAll(".delete-config-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const configId = e.currentTarget.getAttribute("data-config-id");
          Storage.deleteConfiguration(configId);
          Storage.showSavedConfigurationsModal(); // Refresh the list
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
   * Save current configuration
   */
  saveCurrentConfiguration() {
    const configName = prompt("Enter a name for this configuration:");
    if (!configName) return;

    const config = Storage.getCurrentConfiguration(configName);
    Storage.saveConfiguration(config);

    showNotification(
      `Configuration "${configName}" saved successfully!`,
      "success"
    );
  },

  /**
   * Get current configuration
   *
   * @param {string} name - Configuration name
   * @returns {Object} Configuration object
   */
  getCurrentConfiguration(name = "Untitled Configuration") {
    const defaultProxy = document.getElementById("defaultProxy")?.value || "";
    const rules = Rules.getRules();
    const additionalFunctions =
      document.getElementById("additionalFunctions")?.value || "";

    const config = {
      id: Date.now().toString(),
      name: name,
      savedAt: new Date().toISOString(),
      defaultProxy: defaultProxy,
      rules: rules,
      additionalFunctions: additionalFunctions,
    };

    return config;
  },

  /**
   * Save configuration to localStorage
   *
   * @param {Object} config - Configuration to save
   */
  saveConfiguration(config) {
    // Get existing configurations
    const configs = this.getAllConfigurations();

    // Add new configuration
    configs.push(config);

    // Save to localStorage
    localStorage.setItem("pacConfigurations", JSON.stringify(configs));
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
   * Load configuration by ID
   *
   * @param {string} configId - Configuration ID
   */
  loadConfigurationById(configId) {
    const configs = this.getAllConfigurations();
    const config = configs.find((c) => c.id === configId);

    if (config) {
      this.loadConfiguration(config);
      showNotification(
        `Configuration "${config.name}" loaded successfully!`,
        "success"
      );
    }
  },

  /**
   * Load a configuration
   *
   * @param {Object} config - Configuration to load
   */
  loadConfiguration(config) {
    // Clear existing rules
    Rules.clearRules();

    // Set default proxy
    const defaultProxyElement = document.getElementById("defaultProxy");
    if (defaultProxyElement) {
      defaultProxyElement.value = config.defaultProxy || "";
    }

    // Add rules
    if (config.rules && Array.isArray(config.rules)) {
      config.rules.forEach((rule) => {
        Rules.addRuleFromTemplate(rule);
      });
    }

    // Set additional functions
    const additionalFunctionsElement = document.getElementById(
      "additionalFunctions"
    );
    if (additionalFunctionsElement) {
      additionalFunctionsElement.value = config.additionalFunctions || "";
    }
  },

  /**
   * Delete a configuration
   *
   * @param {string} configId - Configuration ID to delete
   */
  deleteConfiguration(configId) {
    let configs = this.getAllConfigurations();
    configs = configs.filter((c) => c.id !== configId);
    localStorage.setItem("pacConfigurations", JSON.stringify(configs));

    showNotification("Configuration deleted successfully!", "success");
  },

  /**
   * Load autosaved configuration
   */
  loadAutosavedConfiguration() {
    if (!document.getElementById("defaultProxy")) return;

    const savedConfig = this.getItem("autosaveConfig");
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        this.loadConfiguration(config);
        showNotification("Your previous work has been restored!", "info");
      } catch (e) {
        console.error("Error loading autosaved configuration:", e);
      }
    }
  },
};

// Initialize storage on page load
document.addEventListener("DOMContentLoaded", () => {
  Storage.init();
});
