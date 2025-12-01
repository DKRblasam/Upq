export function rol() {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const customerDiv = document.getElementById("customer");
  const menuNav = document.getElementById("dynamic-menu");
  const menuList = document.getElementById("menu-list");

  if (userStr) {
    const user = JSON.parse(userStr);
    menuNav?.classList.remove("hidden");

    if (user.rol === "user") {
      if (customerDiv) customerDiv.style.display = "none";
    }

    fetchHierarchy();
  }
}
