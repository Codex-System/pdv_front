import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';

export function SuccessModal({
    isOpen,
    onClose,
    paymentMethod,
    total,
}) {
    const paymentLabels = {
        dinheiro: 'Dinheiro',
        cartao: 'Cartão',
        pix: 'PIX',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            type: 'spring',
                            damping: 20,
                        }}
                        className="bg-[#0F172A] rounded-2xl p-8 border border-gray-700 max-w-md w-full mx-4 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    type: 'spring',
                                    damping: 15,
                                }}
                                className="mx-auto w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle className="w-12 h-12 text-green-400" />
                            </motion.div>

                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold text-gray-100 mb-2"
                            >
                                Venda Finalizada!
                            </motion.h2>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-400 mb-6"
                            >
                                A venda foi concluída com sucesso
                            </motion.p>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-[#1E293B] rounded-lg p-6 mb-6 border border-gray-700"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-400">
                                        Forma de Pagamento
                                    </span>

                                    <span className="font-medium text-gray-100">
                                        {paymentLabels[paymentMethod]}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                                    <span className="text-gray-400">Total</span>

                                    <span className="text-2xl font-bold text-green-400">
                                        R$ {total.toFixed(2)}
                                    </span>
                                </div>
                            </motion.div>

                            <motion.button
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                onClick={onClose}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                            >
                                Nova Venda
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
