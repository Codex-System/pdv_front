import { User, Circle, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from '../App';

export function Header() {
    const [currentTime, setCurrentTime] = useState(new Date());

    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const themeColors = {
        bg: isDarkMode ? '#0F172A' : '#ffffff',
        border: isDarkMode ? '#1f2937' : '#e2e8f0',
        text: isDarkMode ? '#f3f4f6' : '#0f172a',
        textSecondary: isDarkMode ? '#9ca3af' : '#64748b',
        cardBg: isDarkMode ? '#1E293B' : '#f8fafc',
    };

    return (
        <div
            className="px-6 py-4"
            style={{
                backgroundColor: themeColors.bg,
                borderBottom: `1px solid ${themeColors.border}`,
            }}
        >
            
            <div className="flex items-center justify-between">
                <div>
                    <h1
                        className="text-2xl font-bold"
                        style={{ color: themeColors.text }}
                    >
                        Codex PDV
                    </h1>

                    <p
                        className="text-sm mt-1"
                        style={{ color: themeColors.textSecondary }}
                    >
                        {formatDate(currentTime)}
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 border-2 transition-all hover:scale-105"
                        style={{
                            backgroundColor: themeColors.cardBg,
                            borderColor: themeColors.border,
                        }}
                    >
                        {isDarkMode ? (
                            <>
                                <Sun className="w-5 h-5 text-yellow-400" />

                                <span className="text-sm font-medium text-yellow-400">
                                    Modo Claro
                                </span>
                            </>
                        ) : (
                            <>
                                <Moon className="w-5 h-5 text-blue-600" />

                                <span className="text-sm font-medium text-blue-600">
                                    Modo Escuro
                                </span>
                            </>
                        )}
                    </button>

                    {/* Status do Caixa */}
                    <div className="flex items-center gap-2 bg-green-600/20 border border-green-600/50 rounded-lg px-4 py-2">
                        <Circle className="w-3 h-3 fill-green-400 text-green-400 animate-pulse" />

                        <span className="text-sm font-medium text-green-400">
                            Caixa Aberto
                        </span>
                    </div>

                    {/* Horário */}
                    <div className="text-right">
                        <p className="text-2xl font-mono font-bold text-blue-400">
                            {formatTime(currentTime)}
                        </p>
                    </div>

                    {/* Operador */}
                    <div
                        className="flex items-center gap-3 rounded-lg px-4 py-2 border"
                        style={{
                            backgroundColor: themeColors.cardBg,
                            borderColor: themeColors.border,
                        }}
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-400" />
                        </div>

                        <div>
                            <p
                                className="text-xs"
                                style={{ color: themeColors.textSecondary }}
                            >
                                Operador
                            </p>

                            <p
                                className="text-sm font-medium"
                                style={{ color: themeColors.text }}
                            >
                                Maria Silva
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
