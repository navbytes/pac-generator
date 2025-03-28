/**
 * Rule management functionality
 */
const Rules = {
  ruleCounter: 0,

  /**
   * Initialize rules functionality
   */
  init() {
    // Add rule buttons
    document
      .getElementById("addHostRule")
      ?.addEventListener("click", () => this.addRule("host"));
    document
      .getElementById("addUrlRule")
      ?.addEventListener("click", () => this.addRule("url"));
    document
      .getElementById("addIpRule")
      ?.addEventListener("click", () => this.addRule("ip"));
    document
      .getElementById("addDnsDomainRule")
      ?.addEventListener("click", () => this.addRule("dnsDomain"));

    // Rule management button
    document
      .getElementById("manageRules")
      ?.addEventListener("click", this.showRuleManagementModal);
    document
      .getElementById("closeRuleManagementModal")
      ?.addEventListener("click", this.hideRuleManagementModal);

    // Rule management actions
    document
      .getElementById("saveRuleOrder")
      ?.addEventListener("click", this.saveRuleOrder);
    document
      .getElementById("deleteAllRules")
      ?.addEventListener("click", this.confirmDeleteAllRules);

    // Initialize sortable for drag and drop reordering
    this.initSortable();

    // Check empty state
    this.checkEmptyState();
  },

  /**
   * Initialize sortable functionality for rule reordering
   */
  initSortable() {
    // Here you would use a library like SortableJS
    // For now, let's just log that it would be initialized
    console.log("Sortable functionality would be initialized here");
  },

  /**
   * Check if there are no rules and show empty state
   */
  checkEmptyState() {
    const rulesContainer = document.getElementById("rulesContainer");
    if (!rulesContainer) return;

    const emptyState = document.getElementById("emptyState");

    if (rulesContainer.querySelectorAll(".rule-item").length === 0) {
      if (!document.getElementById("emptyState")) {
        rulesContainer.innerHTML = `
                  <div id="emptyState" class="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-4">
                          <i class="ri-folder-open-line text-2xl"></i>
                      </div>
                      <p class="text-slate-500">No rules added yet. Use the buttons below to add proxy routing rules.</p>
                  </div>
              `;
      }
    } else if (emptyState) {
      emptyState.remove();
    }
  },

  /**
   * Add a new rule
   *
   * @param {string} type - Type of rule to add
   */
  addRule(type) {
    const id = this.ruleCounter++;
    const rulesContainer = document.getElementById("rulesContainer");
    if (!rulesContainer) return;

    // Remove empty state if it exists
    const emptyState = document.getElementById("emptyState");
    if (emptyState) {
      emptyState.remove();
    }

    const ruleItem = document.createElement("div");
    ruleItem.className =
      "rule-item bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-4";
    ruleItem.id = `rule-${id}`;

    // Get the template for this rule type
    const template = Templates.getRuleTemplate(type);
    if (!template) {
      console.error(`No template found for rule type: ${type}`);
      return;
    }

    // Create the rule content from the template
    ruleItem.innerHTML = template.getHtml(id);

    rulesContainer.appendChild(ruleItem);

    // Add event listener to the remove button
    ruleItem.querySelector(".remove-btn").addEventListener("click", () => {
      document.getElementById(`rule-${id}`).remove();
      this.checkEmptyState();
    });

    // Add tooltips to help icons
    ruleItem.querySelectorAll(".help-icon").forEach((icon) => {
      icon.addEventListener("mouseenter", (e) => {
        this.showTooltip(e.target, e.target.getAttribute("data-tooltip"));
      });

      icon.addEventListener("mouseleave", () => {
        this.hideTooltip();
      });
    });
  },

  /**
   * Add rule from template or saved configuration
   *
   * @param {Object} ruleConfig - Rule configuration
   */
  addRuleFromTemplate(ruleConfig) {
    const id = this.ruleCounter++;
    const rulesContainer = document.getElementById("rulesContainer");
    if (!rulesContainer) return;

    // Remove empty state if it exists
    const emptyState = document.getElementById("emptyState");
    if (emptyState) {
      emptyState.remove();
    }

    const ruleItem = document.createElement("div");
    ruleItem.className =
      "rule-item bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-4";
    ruleItem.id = `rule-${id}`;

    // Get the template for this rule type
    const template = Templates.getRuleTemplate(ruleConfig.type);
    if (!template) {
      console.error(`No template found for rule type: ${ruleConfig.type}`);
      return;
    }

    // Create the rule content from the template
    ruleItem.innerHTML = template.getHtml(id);

    rulesContainer.appendChild(ruleItem);

    // Set the values from the template
    for (const [key, value] of Object.entries(ruleConfig.values)) {
      const inputId = `${key}-${id}`;
      const input = document.getElementById(inputId);
      if (input) {
        input.value = value;
      }
    }

    // Add event listener to the remove button
    ruleItem.querySelector(".remove-btn").addEventListener("click", () => {
      document.getElementById(`rule-${id}`).remove();
      this.checkEmptyState();
    });
  },

  /**
   * Clear all rules
   */
  clearRules() {
    const rulesContainer = document.getElementById("rulesContainer");
    if (!rulesContainer) return;

    const rules = rulesContainer.querySelectorAll(".rule-item");

    rules.forEach((rule) => rule.remove());
    this.checkEmptyState();
  },

  /**
   * Get all current rules
   *
   * @returns {Array} Array of rule objects
   */
  getRules() {
    const rules = [];
    const ruleElements = document.querySelectorAll(".rule-item");

    ruleElements.forEach((ruleElement) => {
      const ruleId = ruleElement.id.split("-")[1];
      const ruleType = document.getElementById(`rule-type-${ruleId}`).value;

      const rule = {
        id: ruleId,
        type: ruleType,
        values: {},
      };

      // Get input values based on rule type
      switch (ruleType) {
        case "host":
          rule.values.host = document.getElementById(`host-${ruleId}`).value;
          rule.values.hostProxy = document.getElementById(
            `host-proxy-${ruleId}`
          ).value;
          break;
        case "url":
          rule.values.url = document.getElementById(`url-${ruleId}`).value;
          rule.values.urlProxy = document.getElementById(
            `url-proxy-${ruleId}`
          ).value;
          break;
        case "ip":
          rule.values.ip = document.getElementById(`ip-${ruleId}`).value;
          rule.values.mask = document.getElementById(`mask-${ruleId}`).value;
          rule.values.ipProxy = document.getElementById(
            `ip-proxy-${ruleId}`
          ).value;
          break;
        case "dnsDomain":
          rule.values.domain = document.getElementById(
            `domain-${ruleId}`
          ).value;
          rule.values.domainProxy = document.getElementById(
            `domain-proxy-${ruleId}`
          ).value;
          break;
      }

      rules.push(rule);
    });

    return rules;
  },

  /**
   * Show tooltip for help icons
   *
   * @param {HTMLElement} element - Element to show tooltip for
   * @param {string} text - Tooltip text
   */
  showTooltip(element, text) {
    // Remove any existing tooltips
    this.hideTooltip();

    // Create tooltip
    const tooltip = document.createElement("div");
    tooltip.className =
      "absolute z-50 bg-gray-900 text-white text-sm rounded py-1 px-2 max-w-xs";
    tooltip.id = "tooltip";
    tooltip.textContent = text;

    // Position tooltip
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    tooltip.style.top = `${
      rect.top - tooltipRect.height - 8 + window.scrollY
    }px`;
    tooltip.style.left = `${
      rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX
    }px`;
  },

  /**
   * Hide tooltip
   */
  hideTooltip() {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
      tooltip.remove();
    }
  },

  /**
   * Show rule management modal
   */
  showRuleManagementModal() {
    const ruleManagementModal = document.getElementById("ruleManagementModal");
    if (!ruleManagementModal) return;

    // Populate rule list for reordering
    const ruleOrderContainer = document.getElementById("ruleOrderContainer");
    const rules = Rules.getRules();

    ruleOrderContainer.innerHTML = "";

    rules.forEach((rule, index) => {
      const ruleType = rule.type;
      let ruleDesc = "";

      switch (ruleType) {
        case "host":
          ruleDesc = `Host: ${rule.values.host}`;
          break;
        case "url":
          ruleDesc = `URL: ${rule.values.url}`;
          break;
        case "ip":
          ruleDesc = `IP: ${rule.values.ip}/${rule.values.mask}`;
          break;
        case "dnsDomain":
          ruleDesc = `Domain: ${rule.values.domain}`;
          break;
      }

      const ruleItem = document.createElement("div");
      ruleItem.className =
        "flex items-center bg-white rounded-lg border border-slate-200 p-3 cursor-move";
      ruleItem.setAttribute("data-rule-id", rule.id);

      ruleItem.innerHTML = `
              <div class="mr-3 text-slate-400">
                  <i class="ri-drag-move-fill"></i>
              </div>
              <div class="flex-grow">
                  <div class="flex items-center">
                      <div class="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded font-medium mr-2">${ruleType.toUpperCase()}</div>
                      <div class="text-slate-700 text-sm font-medium">${ruleDesc}</div>
                  </div>
              </div>
              <div class="flex-shrink-0 ml-2">
                  <button type="button" class="rule-delete-btn text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors" data-rule-id="${
                    rule.id
                  }">
                      <i class="ri-delete-bin-6-line"></i>
                  </button>
              </div>
          `;

      ruleOrderContainer.appendChild(ruleItem);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".rule-delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const ruleId = e.currentTarget.getAttribute("data-rule-id");
        const ruleItem = document.querySelector(`[data-rule-id="${ruleId}"]`);
        ruleItem.remove();
      });
    });

    // Show modal
    ruleManagementModal.classList.remove("hidden");
  },

  /**
   * Hide rule management modal
   */
  hideRuleManagementModal() {
    const ruleManagementModal = document.getElementById("ruleManagementModal");
    if (!ruleManagementModal) return;

    ruleManagementModal.classList.add("hidden");
  },

  /**
   * Save rule order after reordering
   */
  saveRuleOrder() {
    const ruleOrderContainer = document.getElementById("ruleOrderContainer");
    const ruleIds = Array.from(
      ruleOrderContainer.querySelectorAll("[data-rule-id]")
    ).map((el) => el.getAttribute("data-rule-id"));

    // Here you would implement the actual reordering
    // For now, let's just log that it would be saved
    console.log("New rule order would be saved:", ruleIds);

    // Close modal
    Rules.hideRuleManagementModal();

    // Show notification
    showNotification("Rule order saved successfully!", "success");
  },

  /**
   * Confirm before deleting all rules
   */
  confirmDeleteAllRules() {
    if (
      confirm(
        "Are you sure you want to delete all rules? This cannot be undone."
      )
    ) {
      Rules.clearRules();
      Rules.hideRuleManagementModal();
      showNotification("All rules deleted successfully!", "success");
    }
  },
};

// Initialize rules if we're on the builder page
if (document.getElementById("rulesContainer")) {
  document.addEventListener("DOMContentLoaded", () => {
    Rules.init();
  });
}
