/**
 * MenuHandler class is responsible for handling all interactions within the navigation menu.
 * It provides methods for initializing menu items and their respective child menus.
 */
class MenuHandler {
	/**
	 * Constructor initializes DOM references and child menu lookups.
	 */
	constructor() {
		this.modal = document.getElementById("modal-overlay");
		this.navMenuItems = document.querySelectorAll(".menu-item");
		this.childMenus = Array.from(document.querySelectorAll(".child-menu"));
		this.parentMenuItems = document.querySelectorAll(".parent-menu-item");
		this.childMenuLookup = this.createChildMenuLookup();
	}

	/**
	 * Creates a lookup object to quickly find child menus based on their parent menu index.
	 * @returns {Object} A lookup object with parent indices as keys and an array of child menus as values.
	 */
	createChildMenuLookup() {
		return this.childMenus.reduce((lookup, childMenu) => {
			const parentIndex = childMenu.dataset.parentIndex;
			lookup[parentIndex] = lookup[parentIndex] || [];
			lookup[parentIndex].push(childMenu);
			return lookup;
		}, {});
	}

	/**
	 * Initializes nav menu items and binds event listeners for hover interactions.
	 */
	initNavMenuItems() {
		this.navMenuItems.forEach((item) => {
			const isMegaMenu = item.dataset.menuType === "mega";
			const megaMenu = isMegaMenu ? item.querySelector(".menu-item__mega-menu") : null;

			item.addEventListener("mouseenter", () => {
				item.toggleAttribute("active");
				this.modal.toggleAttribute("open");
			});

			item.addEventListener("mouseleave", (event) => {
				let relatedTarget = event.relatedTarget;

				while (relatedTarget) {
					if (relatedTarget === item) return;
					relatedTarget = relatedTarget.parentNode;
				}

				if (megaMenu) {
					item.toggleAttribute("active");
					this.modal.toggleAttribute("open");
				}
			});
		});
	}

	/**
	 * Initializes parent menu items and binds event listeners for hover interactions with child menus.
	 */
	// initParentMenuItems() {
	// 	this.parentMenuItems.forEach((parentMenuItem, index) => {
	// 		parentMenuItem.addEventListener("mouseenter", () => {
	// 			const relevantChildMenus = this.childMenuLookup[index] || [];
	// 			relevantChildMenus.forEach((childMenu) => {
	// 				childMenu.setAttribute("active", "");
	// 			});
	// 		});
	// 	});
	// }

	/**
	 * Main initialization function, waits for the DOM to load before initializing menu items.
	 */
	init() {
		document.addEventListener("DOMContentLoaded", () => {
			this.initNavMenuItems();
			this.initParentMenuItems();
		});
	}
}

// Instantiate MenuHandler and initialize.
const menuHandler = new MenuHandler();
menuHandler.init();
