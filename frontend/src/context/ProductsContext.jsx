import { createContext, useContext, useState, useEffect } from "react";
import { websiteConfig } from "@/data/website-config";
import { toast } from "sonner";

const ProductsContext = createContext();
const CATALOG_VERSION = "v2_pure_racold";

export function ProductsProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    try {
      const storedVersion = localStorage.getItem("sunaura_catalog_version");
      if (storedVersion !== CATALOG_VERSION) {
        localStorage.setItem("sunaura_catalog_version", CATALOG_VERSION);
        localStorage.setItem("sunaura_categories", JSON.stringify(websiteConfig.categories));
        return websiteConfig.categories;
      }
      const saved = localStorage.getItem("sunaura_categories");
      return saved ? JSON.parse(saved) : websiteConfig.categories;
    } catch (e) {
      return websiteConfig.categories;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("sunaura_settings");
      return saved ? JSON.parse(saved) : websiteConfig.settings;
    } catch (e) {
      return websiteConfig.settings;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem("sunaura_admin_auth") === "true";
  });

  useEffect(() => {
    try {
      localStorage.setItem("sunaura_categories", JSON.stringify(categories));
    } catch (e) {
      console.error("Error saving categories to localStorage", e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem("sunaura_settings", JSON.stringify(settings));
    } catch (e) {
      console.error("Error saving settings to localStorage", e);
    }
  }, [settings]);

  // Admin Auth Methods
  const loginAdmin = (password) => {
    if (password === "sunaura2026" || password === "racoldranchi" || password === "sunaura") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("sunaura_admin_auth", "true");
      toast.success("Welcome, Store Admin!");
      return true;
    } else {
      toast.error("Incorrect Admin Password / PIN");
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("sunaura_admin_auth");
    toast.info("Logged out from Admin Portal");
  };

  // 1-Tap Stock Toggle
  const toggleStock = (categoryId, productId) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.map((prod) => {
            if (prod.id === productId || prod.name === productId) {
              const newStatus = !prod.in_stock;
              toast.success(`${prod.name} marked as ${newStatus ? "In Stock 🟢" : "Out of Stock 🔴"}`);
              return { ...prod, in_stock: newStatus };
            }
            return prod;
          }),
        };
      })
    );
  };

  // Fast Delivery Toggle
  const toggleFastDelivery = (categoryId, productId) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.map((prod) => {
            if (prod.id === productId || prod.name === productId) {
              const newStatus = !prod.fast_delivery;
              toast.success(`${prod.name} Ranchi Fast Delivery: ${newStatus ? "ON" : "OFF"}`);
              return { ...prod, fast_delivery: newStatus };
            }
            return prod;
          }),
        };
      })
    );
  };

  // Update Product Price / Details
  const updateProduct = (categoryId, productId, updatedFields) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.map((prod) => {
            if (prod.id === productId || prod.name === productId) {
              return { ...prod, ...updatedFields };
            }
            return prod;
          }),
        };
      })
    );
    toast.success("Product details updated successfully!");
  };

  // Add New Product
  const addProduct = (categoryId, newProduct) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: [
            {
              ...newProduct,
              id: newProduct.id || `prod-${Date.now()}`,
              in_stock: newProduct.in_stock !== undefined ? newProduct.in_stock : true,
            },
            ...cat.products,
          ],
        };
      })
    );
    toast.success(`Added ${newProduct.name} to ${categoryId}!`);
  };

  // Delete Product
  const deleteProduct = (categoryId, productId) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.filter((prod) => prod.id !== productId && prod.name !== productId),
        };
      })
    );
    toast.info("Product removed from catalog");
  };

  // Add New Category (e.g. for future brand distribution)
  const addCategory = (newCat) => {
    const slug = newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const categoryToAdd = {
      ...newCat,
      id: newCat.id || slug,
      products: newCat.products || [],
      features: newCat.features || ["Authorized Warranty", "Genuine Parts", "Ranchi Delivery Available"],
    };

    setCategories((prev) => [...prev, categoryToAdd]);
    toast.success(`New Category "${newCat.name}" created!`);
  };

  // Reset to default
  const resetToDefault = () => {
    setCategories(websiteConfig.categories);
    setSettings(websiteConfig.settings);
    localStorage.setItem("sunaura_catalog_version", CATALOG_VERSION);
    localStorage.setItem("sunaura_categories", JSON.stringify(websiteConfig.categories));
    localStorage.setItem("sunaura_settings", JSON.stringify(websiteConfig.settings));
    toast.success("Reset catalog to default Racold configuration");
  };

  return (
    <ProductsContext.Provider
      value={{
        categories,
        settings,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        toggleStock,
        toggleFastDelivery,
        updateProduct,
        addProduct,
        deleteProduct,
        addCategory,
        resetToDefault,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
