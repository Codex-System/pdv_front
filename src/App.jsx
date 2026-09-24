import { useState, useEffect, createContext, useContext } from 'react';
import { Barcode, Trash2, } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CartPanel } from './components/CartPanel';
import { SuccessModal } from './components/SuccessModal';

// ======================
// CONTEXT
// ======================

const ThemeContext = createContext({
    isDarkMode: true,
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

// ======================
// DATABASE
// ======================

const productsDatabase = [
    {
        id: '1',
        ean: '7891234567890',
        internalCode: 'CC2L',
        description: 'Refrigerante Coca-Cola 2L',
        price: 10.5,
        category: 'Bebidas',
    },
    {
        id: '2',
        ean: '7891234567891',
        internalCode: 'CC2LF',
        description: 'Refrigerante Coca-Cola 2L (frd 6)',
        price: 58,
        category: 'Bebidas',
    },
    {
        id: '3',
        ean: '7891234567892',
        internalCode: 'CC600',
        description: 'Refrigerante Coca-Cola 600ml',
        price: 5.5,
        category: 'Bebidas',
    },
    {
        id: '4',
        ean: '7891234567893',
        internalCode: 'CC600F',
        description: 'Refrigerante Coca-Cola 600ml (frd 12)',
        price: 60,
        category: 'Bebidas',
    },
    {
        id: '5',
        ean: '7891234567894',
        internalCode: 'CC200',
        description: 'Refrigerante Coca-Cola 200ml',
        price: 2.5,
        category: 'Bebidas',
    },
    {
        id: '6',
        ean: '7891234567895',
        internalCode: 'CCZ2L',
        description: 'Refrigerante Coca-Cola Zero 2L',
        price: 10.5,
        category: 'Bebidas',
    },
    {
        id: '7',
        ean: '7891234567896',
        internalCode: 'CCZ600',
        description: 'Refrigerante Coca-Cola Zero 600ml',
        price: 5.5,
        category: 'Bebidas',
    },
    {
        id: '8',
        ean: '7891234567897',
        internalCode: 'ARZ5K',
        description: 'Arroz 5kg',
        price: 25.9,
        category: 'Alimentos',
    },
    {
        id: '9',
        ean: '7891234567898',
        internalCode: 'FEJ1K',
        description: 'Feijão 1kg',
        price: 7.8,
        category: 'Alimentos',
    },
    {
        id: '10',
        ean: '7891234567899',
        internalCode: 'MAC500',
        description: 'Macarrão 500g',
        price: 4.5,
        category: 'Alimentos',
    },
    {
        id: '11',
        ean: '7891234567800',
        internalCode: 'CAF500',
        description: 'Café 500g',
        price: 12.9,
        category: 'Alimentos',
    },
    {
        id: '12',
        ean: '7891234567801',
        internalCode: 'AGU1L',
        description: 'Água 1.5L',
        price: 2.5,
        category: 'Bebidas',
    },
    {
        id: '13',
        ean: '7891234567802',
        internalCode: 'SUC1L',
        description: 'Suco Del Valle 1L',
        price: 5.9,
        category: 'Bebidas',
    },
    {
        id: '14',
        ean: '7891234567803',
        internalCode: 'PAO',
        description: 'Pão Francês',
        price: 15,
        category: 'Padaria',
    },
    {
        id: '15',
        ean: '7891234567804',
        internalCode: 'LEI1L',
        description: 'Leite 1L',
        price: 4.8,
        category: 'Laticínios',
    },
];

const managersDatabase = [
    {
        id: '1234',
        name: 'Gerente 1',
        password: '4321',
    },
    {
        id: '5678',
        name: 'Gerente 2',
        password: '8765',
    },
];

// ======================
// APP
// ======================


export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const [activeTab, setActiveTab] = useState('vendas');

    const [cartItems, setCartItems] = useState([]);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [lastSale, setLastSale] = useState(null);

    const [searchInput, setSearchInput] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    const [showProductModal, setShowProductModal] = useState(false);

    const [orderCounter, setOrderCounter] = useState(1);

    // QUANTITY

    const [showQuantityModal, setShowQuantityModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [quantityInput, setQuantityInput] = useState(1);

    // DISCOUNT LOGIN

    const [showDiscountLoginModal, setShowDiscountLoginModal] =
        useState(false);

    const [loginInput, setLoginInput] = useState('');

    const [passwordInput, setPasswordInput] = useState('');

    const [recognizedManager, setRecognizedManager] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // PRODUCT DISCOUNT

    const [showProductSelectModal, setShowProductSelectModal] =
        useState(false);

    const [selectedProductIndex, setSelectedProductIndex] = useState(0);

    // DISCOUNT VALUE

    const [showDiscountValueModal, setShowDiscountValueModal] =
        useState(false);

    const [discountValueInput, setDiscountValueInput] = useState(0);

    const [productToDiscount, setProductToDiscount] = useState(null);

    // CANCEL ITEM

    const [showCancelItemModal, setShowCancelItemModal] = useState(false);

    const [itemToCancel, setItemToCancel] = useState(null);

    const [cancelLoginInput, setCancelLoginInput] = useState('');

    const [cancelPasswordInput, setCancelPasswordInput] = useState('');

    const [cancelRecognizedManager, setCancelRecognizedManager] =
        useState(null);

    // CANCEL SALE

    const [showCancelSaleModal, setShowCancelSaleModal] = useState(false);

    const [cancelSaleLoginInput, setCancelSaleLoginInput] = useState('');

    const [cancelSalePasswordInput, setCancelSalePasswordInput] =
        useState('');

    const [cancelSaleRecognizedManager, setCancelSaleRecognizedManager] =
        useState(null);

    // ======================
    // THEME
    // ======================

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    const themeColors = {
        bg: isDarkMode ? '#020617' : '#f8fafc',
        surface: isDarkMode ? '#0F172A' : '#ffffff',
        border: isDarkMode ? '#1f2937' : '#e2e8f0',
        text: isDarkMode ? '#f3f4f6' : '#0f172a',
        textSecondary: isDarkMode ? '#9ca3af' : '#64748b',
        accent: isDarkMode ? '#1E3A8A' : '#3b82f6',
    };

    // ======================
    // SEARCH
    // ======================

    const handleSearch = (e) => {
        e.preventDefault();
        performSearch(searchInput);
    };

    const performSearch = (query) => {
        if (!query.trim()) return;

        const searchTerm = query.trim().toLowerCase();

        const results = productsDatabase.filter(
            (product) =>
                product.ean.includes(searchTerm) ||
                product.internalCode.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
        );

        if (results.length === 0) {
            return;
        }

        if (results.length === 1) {
            addProductToCart(results[0]);
            setSearchInput('');
            return;
        }

        setSearchResults(results);
        setShowProductModal(true);
    };

    // ======================
    // CART
    // ======================



    const addProductToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            const newItem = {
                ...product,
                orderIndex: orderCounter,
                quantity: 1,
                discount: 0,
            };

            setOrderCounter((prevCounter) => prevCounter + 1);

            return [...prev, newItem];
        });
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);

        setShowProductModal(false);

        setShowQuantityModal(true);

        setQuantityInput(1);
    };

    const handleConfirmQuantity = () => {
        if (!selectedProduct) return;

        const newItem = {
            ...selectedProduct,
            orderIndex: orderCounter,
            quantity: quantityInput,
            discount: 0,
        };

        setCartItems((prev) => [...prev, newItem]);

        setOrderCounter((prev) => prev + 1);

        setShowQuantityModal(false);

        setSelectedProduct(null);

        setSearchInput('');

        setSearchResults([]);
    };

    // ======================
    // LOGIN DESCONTO
    // ======================

    const handleLoginChange = (value) => {
        setLoginInput(value);

        const manager = managersDatabase.find((m) => m.id === value);

        setRecognizedManager(manager || null);
    };

    const handleLoginSubmit = () => {
        if (
            recognizedManager &&
            passwordInput === recognizedManager.password
        ) {
            setIsAuthenticated(true);

            setShowDiscountLoginModal(false);

            setShowProductSelectModal(true);

            setSelectedProductIndex(0);

            setLoginInput('');

            setPasswordInput('');

            setRecognizedManager(null);
        }
    };

    const handleSelectProductForDiscount = (item) => {
        setProductToDiscount(item);

        setShowProductSelectModal(false);

        setShowDiscountValueModal(true);

        setDiscountValueInput(0);
    };

    const handleConfirmDiscount = () => {
        if (!productToDiscount) return;

        handleUpdateDiscount(
            productToDiscount.orderIndex,
            discountValueInput
        );

        setShowDiscountValueModal(false);

        setProductToDiscount(null);

        setIsAuthenticated(false);
    };

    // ======================
    // CANCEL ITEM
    // ======================

    const handleRequestCancelItem = (item) => {
        setItemToCancel(item);

        setShowCancelItemModal(true);
    };

    const handleCancelLoginChange = (value) => {
        setCancelLoginInput(value);

        const manager = managersDatabase.find((m) => m.id === value);

        setCancelRecognizedManager(manager || null);
    };

    const handleConfirmCancelItem = () => {
        if (
            cancelRecognizedManager &&
            cancelPasswordInput === cancelRecognizedManager.password &&
            itemToCancel
        ) {
            handleRemoveItem(itemToCancel.orderIndex);

            setShowCancelItemModal(false);

            setItemToCancel(null);

            setCancelLoginInput('');

            setCancelPasswordInput('');

            setCancelRecognizedManager(null);
        }
    };

    // ======================
    // CANCEL SALE
    // ======================

    const handleCancelSaleLoginChange = (value) => {
        setCancelSaleLoginInput(value);

        const manager = managersDatabase.find((m) => m.id === value);

        setCancelSaleRecognizedManager(manager || null);
    };

    const handleConfirmCancelSale = () => {
        if (
            cancelSaleRecognizedManager &&
            cancelSalePasswordInput ===
            cancelSaleRecognizedManager.password
        ) {
            setCartItems([]);

            setOrderCounter(1);

            setShowCancelSaleModal(false);

            setCancelSaleLoginInput('');

            setCancelSalePasswordInput('');

            setCancelSaleRecognizedManager(null);
        }
    };

    // ======================
    // EFFECTS
    // ======================

    useEffect(() => {
        let buffer = '';

        let timeout;

        const handleKeyPress = (e) => {
            if (
                e.target.tagName === 'INPUT' ||
                showProductModal
            ) {
                return;
            }

            if (e.key === 'Enter' && buffer.length > 0) {
                performSearch(buffer);

                buffer = '';
            } else if (e.key.length === 1) {
                buffer += e.key;

                clearTimeout(timeout);

                timeout = setTimeout(() => {
                    buffer = '';
                }, 100);
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);

            clearTimeout(timeout);
        };
    }, [showProductModal]);

    useEffect(() => {
        if (!showProductSelectModal) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();

                setSelectedProductIndex((prev) =>
                    Math.max(0, prev - 1)
                );
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();

                setSelectedProductIndex((prev) =>
                    Math.min(cartItems.length - 1, prev + 1)
                );
            }

            if (e.key === 'Enter') {
                e.preventDefault();

                if (cartItems[selectedProductIndex]) {
                    handleSelectProductForDiscount(
                        cartItems[selectedProductIndex]
                    );
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        showProductSelectModal,
        selectedProductIndex,
        cartItems,
    ]);

    // ======================
    // ACTIONS
    // ======================

    const handleUpdateDiscount = (orderIndex, discount) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.orderIndex === orderIndex
                    ? {
                        ...item,
                        discount,
                    }
                    : item
            )
        );
    };

    const handleRemoveItem = (orderIndex) => {
        setCartItems((prev) =>
            prev.filter((item) => item.orderIndex !== orderIndex)
        );
    };

    const handleFinalizeSale = (
        paymentMethod,
        totalDiscount
    ) => {
        const subtotal = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const itemDiscounts = cartItems.reduce(
            (sum, item) =>
                sum + item.discount * item.quantity,
            0
        );

        const total =
            subtotal - itemDiscounts - totalDiscount;

        setLastSale({
            paymentMethod,
            total,
        });

        setShowSuccessModal(true);

        setCartItems([]);

        setOrderCounter(1);
    };

    // ======================
    // TOTALS
    // ======================

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const itemDiscounts = cartItems.reduce(
        (sum, item) =>
            sum + item.discount * item.quantity,
        0
    );

    // ======================
    // JSX
    // ======================

    return (
        <ThemeContext.Provider
            value={{
                isDarkMode,
                toggleTheme,
            }}
        >
            <div
                className="h-screen flex flex-col overflow-hidden"
                style={{
                    backgroundColor: themeColors.bg,
                }}
            >
                <Header />

                <div className="flex-1 flex overflow-hidden">
                    <Sidebar
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div
                            className="p-4"
                            style={{
                                borderBottom: `1px solid ${themeColors.border}`,
                            }}
                        >
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <Barcode className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-blue-400" />

                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) =>
                                            setSearchInput(e.target.value)
                                        }
                                        placeholder="Pesquisar produto..."
                                        className="w-full border-2 rounded-xl pl-14 pr-28 py-4 text-lg focus:outline-none focus:border-blue-600"
                                        style={{
                                            backgroundColor:
                                                themeColors.surface,
                                            borderColor:
                                                themeColors.border,
                                            color: themeColors.text,
                                        }}
                                        autoFocus
                                    />

                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold"
                                    >
                                        Buscar
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* LISTA */}

                        <div className="flex-1 overflow-hidden p-4">
                            {cartItems.length === 0 ? (
                                <div
                                    className="h-full flex items-center justify-center"
                                    style={{
                                        color: themeColors.textSecondary,
                                    }}
                                >
                                    <div className="text-center">
                                        <Barcode className="w-20 h-20 mx-auto mb-4 opacity-30" />

                                        <p className="text-xl">
                                            Nenhum produto adicionado
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="h-full rounded-xl border overflow-hidden"
                                    style={{
                                        backgroundColor:
                                            themeColors.surface,
                                        borderColor:
                                            themeColors.border,
                                    }}
                                >
                                    <div
                                        className="px-4 py-3 grid grid-cols-[60px_140px_100px_1fr_80px_120px_100px_120px_50px] gap-3 font-semibold text-sm"
                                        style={{
                                            backgroundColor:
                                                themeColors.accent,
                                            color: '#ffffff',
                                        }}
                                    >
                                        <div>ID</div>
                                        <div>EAN</div>
                                        <div>Código</div>
                                        <div>Descrição</div>
                                        <div className="text-center">
                                            Qtd
                                        </div>
                                        <div className="text-right">
                                            Unit.
                                        </div>
                                        <div className="text-right">
                                            Desc.
                                        </div>
                                        <div className="text-right">
                                            Total
                                        </div>
                                        <div />
                                    </div>

                                    <ul
                                        className="overflow-y-auto"
                                        style={{
                                            maxHeight:
                                                'calc(100vh - 280px)',
                                        }}
                                    >
                                        {cartItems.map((item) => {
                                            const totalItem =
                                                item.price * item.quantity -
                                                item.discount *
                                                item.quantity;

                                            return (
                                                <li
                                                    key={item.orderIndex}
                                                    className="group px-4 py-3 grid grid-cols-[60px_140px_100px_1fr_80px_120px_100px_120px_50px] gap-3 items-center"
                                                    style={{
                                                        borderBottom: `1px solid ${themeColors.border}`,
                                                        color: themeColors.text,
                                                    }}
                                                >
                                                    <div className="font-mono text-blue-400">
                                                        {item.orderIndex}
                                                    </div>

                                                    <div className="font-mono text-sm">
                                                        {item.ean}
                                                    </div>

                                                    <div className="font-mono text-sm">
                                                        {item.internalCode}
                                                    </div>

                                                    <div className="text-sm">
                                                        {item.description}
                                                    </div>

                                                    <div className="text-center font-mono font-semibold">
                                                        {item.quantity}
                                                    </div>

                                                    <div className="text-right font-mono">
                                                        R$ {item.price.toFixed(2)}
                                                    </div>

                                                    <div className="text-right font-mono text-red-400">
                                                        {item.discount > 0
                                                            ? `- R$ ${item.discount.toFixed(
                                                                2
                                                            )}`
                                                            : 'R$ 0.00'}
                                                    </div>

                                                    <div className="text-right font-mono font-semibold text-blue-400">
                                                        R$ {totalItem.toFixed(2)}
                                                    </div>

                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() =>
                                                                handleRequestCancelItem(
                                                                    item
                                                                )
                                                            }
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-600/20 rounded-lg"
                                                        >
                                                            <Trash2 className="w-5 h-5 text-red-500" />
                                                        </button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <CartPanel
                        subtotal={subtotal}
                        itemDiscounts={itemDiscounts}
                        onFinalizeSale={handleFinalizeSale}
                        hasItems={cartItems.length > 0}
                        onOpenDiscountModal={() =>
                            setShowDiscountLoginModal(true)
                        }
                        onOpenCancelSaleModal={() =>
                            setShowCancelSaleModal(true)
                        }
                    />
                </div>

                {/* Product Selection Modal */}
                {showProductModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden shadow-2xl shadow-blue-600/30" style={{ backgroundColor: themeColors.surface, border: `2px solid ${themeColors.accent}` }}>
                            <div className="px-6 py-4" style={{ backgroundColor: themeColors.accent }}>
                                <h3 className="text-xl font-semibold text-white">Selecione o Produto</h3>
                                <p className="text-sm text-gray-200 mt-1">{searchResults.length} produto(s) encontrado(s)</p>
                            </div>

                            <div className="p-4 overflow-y-auto max-h-[60vh]">
                                <ul className="space-y-2">
                                    {searchResults.map((product) => (
                                        <li key={product.id}>
                                            <button
                                                onClick={() => handleSelectProduct(product)}
                                                className="w-full border-2 rounded-xl p-4 text-left transition-all group hover:shadow-lg"
                                                style={{
                                                    backgroundColor: themeColors.surface,
                                                    borderColor: themeColors.border,
                                                }}
                                            >
                                                <div className="grid grid-cols-[140px_100px_1fr_120px] gap-4 items-center">
                                                    <div>
                                                        <div className="text-xs mb-1" style={{ color: themeColors.textSecondary }}>EAN</div>
                                                        <div className="font-mono text-sm" style={{ color: themeColors.text }}>{product.ean}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs mb-1" style={{ color: themeColors.textSecondary }}>Código</div>
                                                        <div className="font-mono text-sm text-blue-400">{product.internalCode}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs mb-1" style={{ color: themeColors.textSecondary }}>Descrição</div>
                                                        <div style={{ color: themeColors.text }}>{product.description}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xs mb-1" style={{ color: themeColors.textSecondary }}>Preço</div>
                                                        <div className="font-mono font-semibold text-green-400 text-lg">R$ {product.price.toFixed(2)}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="px-6 py-4" style={{ borderTop: `1px solid ${themeColors.border}` }}>
                                <button
                                    onClick={() => {
                                        setShowProductModal(false);
                                        setSearchResults([]);
                                    }}
                                    className="w-full py-3 rounded-xl font-semibold transition-all"
                                    style={{
                                        backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
                                        color: isDarkMode ? '#f3f4f6' : '#1f2937',
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODAL QUANTIDADE */}
                {showQuantityModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-slate-900 p-6 rounded-xl w-100">
                            <h2 className="text-xl font-bold mb-4">
                                Quantidade
                            </h2>

                            <input
                                type="number"
                                min="1"
                                value={quantityInput}
                                onChange={(e) =>
                                    setQuantityInput(Number(e.target.value))
                                }
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <button
                                onClick={handleConfirmQuantity}
                                className="w-full mt-4 p-3 bg-blue-600 rounded-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                )}

                {/* LOGIN GERENTE DESCONTO */}
                {showDiscountLoginModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-slate-900 p-6 rounded-xl w-100">
                            <h2 className="text-xl font-bold mb-4">
                                Autorização Gerencial
                            </h2>

                            <input
                                placeholder="Matrícula"
                                value={loginInput}
                                onChange={(e) =>
                                    handleLoginChange(e.target.value)
                                }
                                className="w-full p-3 mb-3 rounded bg-slate-800"
                            />

                            <input
                                type="password"
                                placeholder="Senha"
                                value={passwordInput}
                                onChange={(e) =>
                                    setPasswordInput(e.target.value)
                                }
                                className="w-full p-3 mb-4 rounded bg-slate-800"
                            />

                            <button
                                onClick={handleLoginSubmit}
                                className="w-full p-3 bg-green-600 rounded-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                )}

                {/* SELEÇÃO DE ITEM PARA DESCONTO */}
                {showProductSelectModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-slate-900 p-6 rounded-xl w-150">
                            <h2 className="text-xl font-bold mb-4">
                                Escolha o item
                            </h2>

                            {cartItems.map((item) => (
                                <button
                                    key={item.orderIndex}
                                    onClick={() =>
                                        handleSelectProductForDiscount(item)
                                    }
                                    className="w-full text-left p-3 hover:bg-slate-800 rounded-lg"
                                >
                                    {item.description}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* VALOR DO DESCONTO */}
                {showDiscountValueModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-slate-900 p-6 rounded-xl w-100">
                            <h2 className="text-xl font-bold mb-4">
                                Valor do desconto
                            </h2>

                            <input
                                type="number"
                                value={discountValueInput}
                                onChange={(e) =>
                                    setDiscountValueInput(Number(e.target.value))
                                }
                                className="w-full p-3 rounded bg-slate-800"
                            />

                            <button
                                onClick={handleConfirmDiscount}
                                className="w-full mt-4 p-3 bg-green-600 rounded-lg"
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                )}

                {/* CANCELAMENTO DE ITEM */}
                {showCancelItemModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-slate-900 p-6 rounded-xl w-100">
                            <h2 className="text-xl font-bold mb-4">
                                Cancelar Item
                            </h2>

                            <input
                                placeholder="Matrícula"
                                value={cancelLoginInput}
                                onChange={(e) =>
                                    handleCancelLoginChange(e.target.value)
                                }
                                className="w-full p-3 mb-3 rounded bg-slate-800"
                            />

                            <input
                                type="password"
                                placeholder="Senha"
                                value={cancelPasswordInput}
                                onChange={(e) =>
                                    setCancelPasswordInput(e.target.value)
                                }
                                className="w-full p-3 mb-4 rounded bg-slate-800"
                            />

                            <button
                                onClick={handleConfirmCancelItem}
                                className="w-full p-3 bg-red-600 rounded-lg"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                )}

                {/* CANCELAMENTO DE VENDA */}
                {showCancelSaleModal && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-slate-900 p-6 rounded-xl w-100">
                            <h2 className="text-xl font-bold mb-4">
                                Cancelar Venda
                            </h2>

                            <input
                                placeholder="Matrícula"
                                value={cancelSaleLoginInput}
                                onChange={(e) =>
                                    handleCancelSaleLoginChange(e.target.value)
                                }
                                className="w-full p-3 mb-3 rounded bg-slate-800"
                            />

                            <input
                                type="password"
                                placeholder="Senha"
                                value={cancelSalePasswordInput}
                                onChange={(e) =>
                                    setCancelSalePasswordInput(e.target.value)
                                }
                                className="w-full p-3 mb-4 rounded bg-slate-800"
                            />

                            <button
                                onClick={handleConfirmCancelSale}
                                className="w-full p-3 bg-red-600 rounded-lg"
                            >
                                Confirmar Cancelamento
                            </button>
                        </div>
                    </div>
                )}

                {lastSale && (
                    <SuccessModal
                        isOpen={showSuccessModal}
                        onClose={() =>
                            setShowSuccessModal(false)
                        }
                        paymentMethod={
                            lastSale.paymentMethod
                        }
                        total={lastSale.total}
                    />
                )}
            </div>
        </ThemeContext.Provider>
    );
}