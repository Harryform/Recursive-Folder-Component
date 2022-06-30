import { LightningElement } from "lwc";

import { NavigationMixin } from "lightning/navigation";

export default class ImanageLinkMenu extends NavigationMixin(LightningElement) {
  handleNavigate() {
    const config = {
      type: "standard__webPage",
      attributes: {
        url: "https://imanage.com/"
      }
    };
    this[NavigationMixin.Navigate](config);
  }
}
