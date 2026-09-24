// src/components/CartPanel.jsx
import { CreditCard, Banknote, Smartphone, Percent, XCircle } from 'lucide-react';
import { motion } from 'framer-motion'; // Ajustado para o pacote padrão
import { useState } from 'react';
import { useTheme } from '../App';



export function CartPanel({
    subtotal,
    itemDiscounts,
    onFinalizeSale,
    hasItems,
    onOpenDiscountModal,
    onOpenCancelSaleModal,
}) {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const { isDarkMode } = useTheme();

    const total = subtotal - itemDiscounts;

    const themeColors = {
        bg: isDarkMode ? '#0F172A' : '#ffffff',
        surface: isDarkMode ? '#1E293B' : '#f8fafc',
        border: isDarkMode ? '#374151' : '#e2e8f0',
        text: isDarkMode ? '#f3f4f6' : '#0f172a',
        textSecondary: isDarkMode ? '#9ca3af' : '#64748b',
    };

    const paymentMethods = [
        { id: 'dinheiro', icon: Banknote, label: 'Dinheiro', color: 'bg-green-600' },
        { id: 'cartao', icon: CreditCard, label: 'Cartão', color: 'bg-purple-600' },
        { id: 'pix', icon: Smartphone, label: 'PIX', color: 'bg-teal-600' },
    ];

    const handleFinalize = () => {
        if (selectedPayment && hasItems) {
            onFinalizeSale(selectedPayment, 0);
            setSelectedPayment(null);
        }
    };

    return (
        <div
            className="w-96 flex flex-col p-6 space-y-6"
            style={{
                backgroundColor: themeColors.bg,
                borderLeft: `1px solid ${themeColors.border}`,
            }}
        >
            {/* Header */}
            <div>
                <h2
                    className="text-xl font-semibold"
                    style={{ color: themeColors.text }}
                >
                    Resumo da Venda
                </h2>
            </div>

            {/* Summary */}
            <div className="flex-1 space-y-4">
                <div
                    className="rounded-xl p-4 border space-y-3"
                    style={{
                        backgroundColor: themeColors.surface,
                        borderColor: themeColors.border,
                    }}
                >
                    <div
                        className="flex justify-between"
                        style={{ color: themeColors.textSecondary }}
                    >
                        <span>Subtotal</span>
                        <span className="font-mono">
                            R$ {subtotal.toFixed(2)}
                        </span>
                    </div>

                    <div
                        className="flex justify-between"
                        style={{ color: themeColors.textSecondary }}
                    >
                        <span>Descontos (itens)</span>
                        <span className="font-mono text-red-400">
                            - R$ {itemDiscounts.toFixed(2)}
                        </span>
                    </div>

                    <div
                        className="flex justify-between text-2xl font-bold text-blue-400 pt-3"
                        style={{
                            borderTop: `1px solid ${themeColors.border}`,
                        }}
                    >
                        <span>TOTAL</span>
                        <span className="font-mono">
                            R$ {total.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <motion.button
                        onClick={onOpenDiscountModal}
                        disabled={!hasItems}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${!hasItems
                                ? 'cursor-not-allowed opacity-50'
                                : 'hover:shadow-lg'
                            }`}
                        style={{
                            backgroundColor: isDarkMode ? '#374151' : '#f1f5f9',
                            color: isDarkMode ? '#f3f4f6' : '#1f2937',
                            border: `2px solid ${themeColors.border}`,
                        }}
                        whileHover={hasItems ? { scale: 1.02 } : {}}
                        whileTap={hasItems ? { scale: 0.98 } : {}}
                    >
                        <Percent className="w-5 h-5" />
                        Desconto
                    </motion.button>

                    <motion.button
                        onClick={onOpenCancelSaleModal}
                        disabled={!hasItems}
                        className={`py-3 px-4 rounded-xl transition-all ${!hasItems
                                ? 'cursor-not-allowed opacity-30'
                                : 'hover:bg-red-600/20'
                            }`}
                        style={{
                            border: `2px solid ${themeColors.border}`,
                            backgroundColor: isDarkMode ? '#1f2937' : '#fef2f2',
                        }}
                        whileHover={hasItems ? { scale: 1.05 } : {}}
                        whileTap={hasItems ? { scale: 0.95 } : {}}
                        title="Cancelar venda"
                    >
                        <XCircle className="w-5 h-5 text-red-500" />
                    </motion.button>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                    <label
                        className="text-sm font-semibold"
                        style={{ color: themeColors.textSecondary }}
                    >
                        Forma de Pagamento
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                        {paymentMethods.map((method) => {
                            const Icon = method.icon;
                            const isSelected = selectedPayment === method.id;

                            return (
                                <motion.button
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method.id)}
                                    className={`p-4 rounded-lg border-2 transition-all ${isSelected
                                            ? `${method.color} border-transparent text-white shadow-lg`
                                            : ''
                                        }`}
                                    style={
                                        !isSelected
                                            ? {
                                                backgroundColor: themeColors.surface,
                                                borderColor: themeColors.border,
                                                color: themeColors.textSecondary,
                                            }
                                            : {}
                                    }
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon className="w-6 h-6 mx-auto mb-2" />
                                    <span className="text-xs font-medium">
                                        {method.label}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Finalize Button */}
                <motion.button
                    onClick={handleFinalize}
                    disabled={!hasItems || !selectedPayment}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${!hasItems || !selectedPayment
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/50'
                        }`}
                    whileHover={
                        hasItems && selectedPayment
                            ? {
                                scale: 1.02,
                                boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
                            }
                            : {}
                    }
                    whileTap={
                        hasItems && selectedPayment
                            ? { scale: 0.98 }
                            : {}
                    }
                >
                    Finalizar Venda
                </motion.button>
            </div>
        </div>
    );
}