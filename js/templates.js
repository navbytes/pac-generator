/**
 * Templates for rules and quick start configurations
 */
const Templates = {
  /**
   * Rule templates
   */
  ruleTemplates: {
    host: {
      getHtml: (id) => `
              <div class="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                  <div class="flex items-center space-x-2">
                      <i class="ri-server-line text-primary-500"></i>
                      <span class="font-medium text-slate-700">Host Rule</span>
                      <span class="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded font-medium">HOST</span>
                  </div>
                  <button type="button" class="remove-btn text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors" data-rule-id="${id}">
                      <i class="ri-delete-bin-6-line"></i>
                  </button>
              </div>
              <input type="hidden" id="rule-type-${id}" value="host">
              <div class="p-4">
                  <div class="mb-4">
                      <div class="flex items-center justify-between mb-2">
                          <label for="host-${id}" class="block text-sm font-medium text-slate-700">Host Match:</label>
                          <i class="ri-question-line text-slate-400 cursor-help help-icon" data-tooltip="Enter an exact hostname to match, e.g. example.com"></i>
                      </div>
                      <input type="text" id="host-${id}" placeholder="example.com" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                      <p class="mt-1 text-sm text-slate-500">Match a specific hostname exactly</p>
                  </div>
                  <div>
                      <label for="host-proxy-${id}" class="block text-sm font-medium text-slate-700 mb-2">Proxy for this host:</label>
                      <input type="text" id="host-proxy-${id}" placeholder="PROXY host:port or DIRECT" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                  </div>
              </div>
          `,
    },

    url: {
      getHtml: (id) => `
              <div class="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                  <div class="flex items-center space-x-2">
                      <i class="ri-link text-primary-500"></i>
                      <span class="font-medium text-slate-700">URL Pattern Rule</span>
                      <span class="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded font-medium">URL</span>
                  </div>
                  <button type="button" class="remove-btn text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors" data-rule-id="${id}">
                      <i class="ri-delete-bin-6-line"></i>
                  </button>
              </div>
              <input type="hidden" id="rule-type-${id}" value="url">
              <div class="p-4">
                  <div class="mb-4">
                      <div class="flex items-center justify-between mb-2">
                          <label for="url-${id}" class="block text-sm font-medium text-slate-700">URL Pattern Match:</label>
                          <i class="ri-question-line text-slate-400 cursor-help help-icon" data-tooltip="Use * as wildcard, e.g. http://*.example.com/secure/*"></i>
                      </div>
                      <input type="text" id="url-${id}" placeholder="http://*.example.com/path/*" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                      <p class="mt-1 text-sm text-slate-500">Use * as wildcard (uses shExpMatch function)</p>
                  </div>
                  <div>
                      <label for="url-proxy-${id}" class="block text-sm font-medium text-slate-700 mb-2">Proxy for this URL pattern:</label>
                      <input type="text" id="url-proxy-${id}" placeholder="PROXY host:port or DIRECT" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                  </div>
              </div>
          `,
    },

    ip: {
      getHtml: (id) => `
              <div class="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                  <div class="flex items-center space-x-2">
                      <i class="ri-router-line text-primary-500"></i>
                      <span class="font-medium text-slate-700">IP Address/Range Rule</span>
                      <span class="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded font-medium">IP</span>
                  </div>
                  <button type="button" class="remove-btn text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors" data-rule-id="${id}">
                      <i class="ri-delete-bin-6-line"></i>
                  </button>
              </div>
              <input type="hidden" id="rule-type-${id}" value="ip">
              <div class="p-4">
                  <div class="mb-4">
                      <div class="flex items-center justify-between mb-2">
                          <label for="ip-${id}" class="block text-sm font-medium text-slate-700">IP Address/Range:</label>
                          <i class="ri-question-line text-slate-400 cursor-help help-icon" data-tooltip="Enter the network address, e.g. 192.168.1.0"></i>
                      </div>
                      <input type="text" id="ip-${id}" placeholder="192.168.1.0" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                  </div>
                  <div class="mb-4">
                      <div class="flex items-center justify-between mb-2">
                          <label for="mask-${id}" class="block text-sm font-medium text-slate-700">Subnet Mask:</label>
                          <i class="ri-question-line text-slate-400 cursor-help help-icon" data-tooltip="Enter the subnet mask, e.g. 255.255.255.0"></i>
                      </div>
                      <input type="text" id="mask-${id}" placeholder="255.255.255.0" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                  </div>
                  <div>
                      <label for="ip-proxy-${id}" class="block text-sm font-medium text-slate-700 mb-2">Proxy for this IP range:</label>
                      <input type="text" id="ip-proxy-${id}" placeholder="PROXY host:port or DIRECT" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                  </div>
              </div>
          `,
    },

    dnsDomain: {
      getHtml: (id) => `
              <div class="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200">
                  <div class="flex items-center space-x-2">
                      <i class="ri-global-line text-primary-500"></i>
                      <span class="font-medium text-slate-700">DNS Domain Rule</span>
                      <span class="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded font-medium">DOMAIN</span>
                  </div>
                  <button type="button" class="remove-btn text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors" data-rule-id="${id}">
                      <i class="ri-delete-bin-6-line"></i>
                  </button>
              </div>
              <input type="hidden" id="rule-type-${id}" value="dnsDomain">
              <div class="p-4">
                  <div class="mb-4">
                      <div class="flex items-center justify-between mb-2">
                          <label for="domain-${id}" class="block text-sm font-medium text-slate-700">DNS Domain:</label>
                          <i class="ri-question-line text-slate-400 cursor-help help-icon" data-tooltip="Include the leading dot, e.g. .example.com"></i>
                      </div>
                      <input type="text" id="domain-${id}" placeholder=".example.com" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                      <p class="mt-1 text-sm text-slate-500">Include the leading dot (matches domain and all subdomains)</p>
                  </div>
                  <div>
                      <label for="domain-proxy-${id}" class="block text-sm font-medium text-slate-700 mb-2">Proxy for this domain:</label>
                      <input type="text" id="domain-proxy-${id}" placeholder="PROXY host:port or DIRECT" class="w-full px-3 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
                  </div>
              </div>
          `,
    },
  },

  /**
   * Quick start templates
   */
  quickStartTemplates: [
    {
      id: "corporate",
      name: "Corporate Network",
      description:
        "Typical setup for a corporate environment with internal and external resources",
      defaultProxy: "PROXY corporateproxy.example.com:8080",
      rules: [
        {
          type: "ip",
          values: {
            ip: "10.0.0.0",
            mask: "255.0.0.0",
            ipProxy: "DIRECT",
          },
        },
        {
          type: "ip",
          values: {
            ip: "192.168.0.0",
            mask: "255.255.0.0",
            ipProxy: "DIRECT",
          },
        },
        {
          type: "dnsDomain",
          values: {
            domain: ".internal.example.com",
            domainProxy: "DIRECT",
          },
        },
      ],
    },
    {
      id: "dual-proxy",
      name: "Dual Proxy Configuration",
      description: "Split traffic between two proxies with failover",
      defaultProxy:
        "PROXY primary.example.com:8080; PROXY backup.example.com:8080; DIRECT",
      rules: [
        {
          type: "url",
          values: {
            url: "https://*.secure.example.com/*",
            urlProxy: "PROXY secureproxy.example.com:8443",
          },
        },
        {
          type: "dnsDomain",
          values: {
            domain: ".partner.example.com",
            domainProxy: "PROXY partnerproxy.example.com:8080",
          },
        },
      ],
    },
    {
      id: "geo-routing",
      name: "Geographical Routing",
      description: "Route traffic based on geographical regions",
      defaultProxy: "PROXY defaultproxy.example.com:8080",
      rules: [
        {
          type: "dnsDomain",
          values: {
            domain: ".us.example.com",
            domainProxy: "PROXY us-proxy.example.com:8080",
          },
        },
        {
          type: "dnsDomain",
          values: {
            domain: ".eu.example.com",
            domainProxy: "PROXY eu-proxy.example.com:8080",
          },
        },
        {
          type: "dnsDomain",
          values: {
            domain: ".asia.example.com",
            domainProxy: "PROXY asia-proxy.example.com:8080",
          },
        },
      ],
    },
    {
      id: "direct-common",
      name: "Common Direct Sites",
      description: "Basic setup with common sites accessed directly",
      defaultProxy: "PROXY proxy.example.com:8080",
      rules: [
        {
          type: "dnsDomain",
          values: {
            domain: ".google.com",
            domainProxy: "DIRECT",
          },
        },
        {
          type: "dnsDomain",
          values: {
            domain: ".microsoft.com",
            domainProxy: "DIRECT",
          },
        },
        {
          type: "dnsDomain",
          values: {
            domain: ".office365.com",
            domainProxy: "DIRECT",
          },
        },
      ],
    },
  ],

  /**
   * Get template for a specific rule type
   *
   * @param {string} type - Rule type
   * @returns {Object} Rule template
   */
  getRuleTemplate(type) {
    return this.ruleTemplates[type];
  },

  /**
   * Show template modal
   */
  showTemplateModal() {
    const templateModal = document.getElementById("templateModal");
    if (!templateModal) return;

    // Populate templates
    Templates.populateTemplates();

    templateModal.classList.remove("hidden");
  },

  /**
   * Hide template modal
   */
  hideTemplateModal() {
    const templateModal = document.getElementById("templateModal");
    if (templateModal) {
      templateModal.classList.add("hidden");
    }
  },

  /**
   * Populate template list in the modal
   */
  populateTemplates() {
    const templatesList = document.getElementById("templatesList");
    if (!templatesList) return;

    templatesList.innerHTML = "";

    this.quickStartTemplates.forEach((template) => {
      const templateCard = document.createElement("div");
      templateCard.className =
        "bg-slate-50 rounded-lg border border-slate-200 overflow-hidden";
      templateCard.innerHTML = `
              <div class="p-4">
                  <h4 class="font-semibold text-slate-800 mb-1">${template.name}</h4>
                  <p class="text-slate-600 text-sm mb-3">${template.description}</p>
                  <button class="use-template-btn w-full text-center px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm" data-template-id="${template.id}">
                      Use This Template
                  </button>
              </div>
          `;

      templatesList.appendChild(templateCard);
    });

    // Add event listeners to template buttons
    document.querySelectorAll(".use-template-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const templateId = e.target.getAttribute("data-template-id");
        Templates.loadTemplate(templateId);
        Templates.hideTemplateModal();
      });
    });
  },

  /**
   * Load a specific template
   *
   * @param {string} templateId - Template ID to load
   */
  loadTemplate(templateId) {
    const template = this.quickStartTemplates.find((t) => t.id === templateId);
    if (!template) return;

    // Clear existing rules
    Rules.clearRules();

    // Set default proxy
    document.getElementById("defaultProxy").value = template.defaultProxy;

    // Add template rules
    template.rules.forEach((rule) => {
      Rules.addRuleFromTemplate(rule);
    });

    // Set additional functions if any
    if (template.additionalFunctions) {
      document.getElementById("additionalFunctions").value =
        template.additionalFunctions;
    }

    showNotification(
      `Template "${template.name}" loaded successfully!`,
      "success"
    );
  },
};
