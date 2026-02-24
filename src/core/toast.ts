import type { NotificationType } from "../lib/definitions";

export default class Toast {
  private static container: HTMLDivElement | null = null;

  private static createContainer() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.className =
        "fixed top-5 right-5 z-50 space-y-3";
      document.body.appendChild(this.container);
    }
  }

  private static show(message: string, type: NotificationType) {
    this.createContainer();

    const toast = document.createElement("div");

    const colors: Record<NotificationType, string> = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    };

    toast.className = `
      px-4 py-3 rounded-lg shadow-lg text-white text-sm
      animate-slide-in
      ${colors[type]}
    `;

    toast.innerText = message;

    this.container!.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  static success(message: string) {
    this.show(message, "success");
  }

  static error(message: string) {
    this.show(message, "error");
  }

  static warning(message: string) {
    this.show(message, "warning");
  }

  static info(message: string) {
    this.show(message, "info");
  }
}