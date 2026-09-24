import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../App';

export function Sidebar({ activeTab, onTabChange }) {
    const { isDarkMode } = useTheme();

    const tabs = [
        {
            id: 'vendas',
            icon: ShoppingCart,
            label: 'Vendas',
        },
    ];

    const themeColors = {
        bg: isDarkMode ? '#0F172A' : '#ffffff',
        border: isDarkMode ? '#1f2937' : '#e2e8f0',
    };

    return (
        <div
            className="w-20 flex flex-col items-center py-6 gap-6"
            style={{
                backgroundColor: themeColors.bg,
                borderRight: `1px solid ${themeColors.border} `,
            }}
        >
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <motion.button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative p - 4 rounded - xl transition - all duration - 200 ${isActive
                                ? 'bg-blue-600/20 text-blue-400'
                                : 'text-gray-400 hover:text-blue-400 hover:bg-blue-600/10'
                            } `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={tab.label}
                    >
                        <Icon
                            className="w-6 h-6"
                            strokeWidth={1.5}
                        />

                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-blue-600/20 rounded-xl"
                                style={{ zIndex: -1 }}
                                transition={{
                                    type: 'spring',
                                    bounce: 0.2,
                                    duration: 0.6,
                                }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
