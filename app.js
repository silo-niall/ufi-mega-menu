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
		this.innerMenuItems = document.querySelectorAll(".mega-menu__item");
		this.megaMenus = document.querySelectorAll(".menu-item__mega-menu");
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
	// initinnerMenuItems() {
	// 	this.innerMenuItems.forEach((parentMenuItem, index) => {
	// 		const subMenu = Array.from(parentMenuItem.querySelector(".sub-menu"));
	// 		parentMenuItem.addEventListener("mouseenter", () => {
	// 			subMenu.setAttribute("active", "");
	// 		});
	// 	});
	// }

	/**
	 * Sets the height of each megamenu according to the largest height of its inner sub-menu.
	 */
	setMegaMenuHeight() {
		this.megaMenus.forEach((megaMenu) => {
			console.log(this.megaMenus);

			let maxHeight = 0;

			// Locate all inner sub-menus within this megaMenu
			const innerSubMenus = megaMenu.querySelectorAll(".sub-menu");
			console.log(innerSubMenus);

			innerSubMenus.forEach((subMenu) => {
				// Calculate the height of each sub-menu
				const subMenuHeight = subMenu.offsetHeight;
				console.log(subMenuHeight);

				// Update maxHeight if this sub-menu is taller
				if (subMenuHeight > maxHeight) {
					maxHeight = subMenuHeight;
				}
			});

			// Set the height of the megaMenu to the maxHeight
			// megaMenu.style.minHeight = `${maxHeight}px`;
		});
	}

	/**
	 * Main initialization function, waits for the DOM to load before initializing menu items.
	 */
	init() {
		document.addEventListener("DOMContentLoaded", () => {
			this.initNavMenuItems();
			// this.initinnerMenuItems();
			this.setMegaMenuHeight();
		});
	}
}

// Instantiate MenuHandler and initialize.
const menuHandler = new MenuHandler();
menuHandler.init();
