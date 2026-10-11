import { createContext, useContext, useState, useEffect } from "react";
import { websiteConfig } from "@/data/website-config";
import { sareeConfig } from "@/data/saree-config";
import { toast } from "sonner";

const ProductsContext = createContext();
const RACOLD_CATALOG_VERSION = "v4_official_pricelist_selling_2026";
const SAREE_CATALOG_VERSION = "v1_saree_catalog_2026";

export function ProductsProvider({ children }) {
  // 1. Racold State
  const [categories, setCategories] = useState(() => {
    try {
      const storedVersion = localStorage.getItem("sunaura_catalog_version");
      if (storedVersion !== RACOLD_CATALOG_VERSION) {
        localStorage.setItem("sunaura_catalog_version", RACOLD_CATALOG_VERSION);
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

  // 2. Surat Saree Factory State
  const [sareeCategories, setSareeCategories] = useState(() => {
    try {
      const storedVersion = localStorage.getItem("sunaura_saree_version");
      if (storedVersion !== SAREE_CATALOG_VERSION) {
        localStorage.setItem("sunaura_saree_version", SAREE_CATALOG_VERSION);
        localStorage.setItem("sunaura_saree_categories", JSON.stringify(sareeConfig.categories));
        return sareeConfig.categories;
      }
      const saved = localStorage.getItem("sunaura_saree_categories");
      return saved ? JSON.parse(saved) : sareeConfig.categories;
    } catch (e) {
      return sareeConfig.categories;
    }
  });

  const [sareeSettings, setSareeSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("sunaura_saree_settings");
      return saved ? JSON.parse(saved) : sareeConfig.settings;
    } catch (e) {
      return sareeConfig.settings;
    }
  });

  // 3. Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem("sunaura_admin_auth") === "true";
  });

  // Sync Racold to localStorage
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

  // Sync Saree to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("sunaura_saree_categories", JSON.stringify(sareeCategories));
    } catch (e) {
      console.error("Error saving saree categories to localStorage", e);
    }
  }, [sareeCategories]);

  useEffect(() => {
    try {
      localStorage.setItem("sunaura_saree_settings", JSON.stringify(sareeSettings));
    } catch (e) {
      console.error("Error saving saree settings to localStorage", e);
    }
  }, [sareeSettings]);

  // Admin Auth Methods
  const loginAdmin = (password) => {
    if (password === "sunaura2026" || password === "racoldranchi" || password === "sunaura" || password === "surat2026") {
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

  // --- RACOLD OPERATIONS ---
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
    toast.success("Racold product details updated successfully!");
  };

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

  // --- SURAT SAREE FACTORY OPERATIONS ---
  const toggleSareeStock = (categoryId, sareeId) => {
    setSareeCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.map((saree) => {
            if (saree.id === sareeId) {
              const newStatus = saree.in_stock !== false ? false : true;
              toast.success(`${saree.name} marked as ${newStatus ? "In Stock 🟢" : "Out of Stock 🔴"}`);
              return { ...saree, in_stock: newStatus };
            }
            return saree;
          }),
        };
      })
    );
  };

  const updateSaree = (categoryId, sareeId, updatedFields) => {
    setSareeCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.map((saree) => {
            if (saree.id === sareeId) {
              return { ...saree, ...updatedFields };
            }
            return saree;
          }),
        };
      })
    );
    toast.success("Saree details updated successfully!");
  };

  const addSaree = (categoryId, newSaree) => {
    setSareeCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: [
            {
              ...newSaree,
              id: newSaree.id || `saree-${Date.now()}`,
              in_stock: newSaree.in_stock !== undefined ? newSaree.in_stock : true,
            },
            ...cat.products,
          ],
        };
      })
    );
    toast.success(`Added ${newSaree.name} to ${categoryId}!`);
  };

  const deleteSaree = (categoryId, sareeId) => {
    setSareeCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.filter((saree) => saree.id !== sareeId),
        };
      })
    );
    toast.info("Saree removed from catalog");
  };

  const addSareeCategory = (newCat) => {
    const slug = newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const categoryToAdd = {
      ...newCat,
      id: newCat.id || slug,
      products: newCat.products || [],
    };

    setSareeCategories((prev) => [...prev, categoryToAdd]);
    toast.success(`New Saree Category "${newCat.name}" created!`);
  };

  // --- SMART UNIVERSAL BULK DISCOUNT ENGINE ---
  const applyBulkDiscount = (storeType, targetCategoryId, discountPercentage) => {
    const discount = Number(discountPercentage);
    if (isNaN(discount) || discount < 1 || discount > 90) {
      toast.error("Please enter a valid discount percentage (between 1% and 90%)");
      return;
    }

    if (storeType === "racold") {
      setCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (targetCategoryId !== "all" && cat.id !== targetCategoryId) return cat;
          return {
            ...cat,
            products: cat.products.map((prod) => {
              if (!prod.mrp) return prod;
              const newPrice = Math.round(prod.mrp * (1 - discount / 100));
              const updatedVariants = prod.variants
                ? prod.variants.map((v) => ({
                    ...v,
                    price: v.mrp ? Math.round(v.mrp * (1 - discount / 100)) : v.price,
                  }))
                : prod.variants;

              return {
                ...prod,
                price: newPrice,
                variants: updatedVariants,
              };
            }),
          };
        })
      );
      toast.success(`Applied ${discount}% discount to Racold ${targetCategoryId === "all" ? "All Categories" : targetCategoryId}!`);
    } else if (storeType === "saree") {
      setSareeCategories((prevCategories) =>
        prevCategories.map((cat) => {
          if (targetCategoryId !== "all" && cat.id !== targetCategoryId) return cat;
          return {
            ...cat,
            products: cat.products.map((saree) => {
              if (!saree.mrp) return saree;
              const newPrice = Math.round(saree.mrp * (1 - discount / 100));
              return {
                ...saree,
                price: newPrice,
              };
            }),
          };
        })
      );
      toast.success(`Applied ${discount}% festive discount to Saree ${targetCategoryId === "all" ? "All Collections" : targetCategoryId}!`);
    }
  };

  // Reset Store to Defaults
  const resetToDefault = (storeType = "all") => {
    if (storeType === "racold" || storeType === "all") {
      setCategories(websiteConfig.categories);
      setSettings(websiteConfig.settings);
      localStorage.setItem("sunaura_catalog_version", RACOLD_CATALOG_VERSION);
      localStorage.setItem("sunaura_categories", JSON.stringify(websiteConfig.categories));
      localStorage.setItem("sunaura_settings", JSON.stringify(websiteConfig.settings));
    }
    if (storeType === "saree" || storeType === "all") {
      setSareeCategories(sareeConfig.categories);
      setSareeSettings(sareeConfig.settings);
      localStorage.setItem("sunaura_saree_version", SAREE_CATALOG_VERSION);
      localStorage.setItem("sunaura_saree_categories", JSON.stringify(sareeConfig.categories));
      localStorage.setItem("sunaura_saree_settings", JSON.stringify(sareeConfig.settings));
    }
    toast.success(`Reset ${storeType.toUpperCase()} store to official default configuration`);
  };

  return (
    <ProductsContext.Provider
      value={{
        // Racold
        categories,
        settings,
        toggleStock,
        toggleFastDelivery,
        updateProduct,
        addProduct,
        deleteProduct,
        addCategory,

        // Saree
        sareeCategories,
        sareeSettings,
        toggleSareeStock,
        updateSaree,
        addSaree,
        deleteSaree,
        addSareeCategory,

        // Common & Discount Engine
        applyBulkDiscount,
        resetToDefault,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
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
