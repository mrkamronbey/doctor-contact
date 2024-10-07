import React, { useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { FaChevronDown } from "react-icons/fa";
import { Modal } from '../Modal';

type Option = {
    value: string;
    label: string;
};

type LanguageOptionsMap = {
    [key: string]: Option[];
};

const optionsMap: LanguageOptionsMap = {
    uzbek: [
        { value: '', label: 'Qanday muammoingiz bor?' },
        { value: 'Farzandsizlik', label: 'Farzandsizlik' },
        { value: 'Erkaklardagi jinsiy muammolar', label: 'Erkaklardagi jinsiy muammolar' },
        { value: 'Ayollardagi jinsiy muammolar', label: 'Ayollardagi jinsiy muammolar' },
        { value: 'Egizak farzand ko\'rish', label: 'Egizak farzand ko\'rish' },
        { value: 'Doktor bilan bog’lanish', label: 'Doktor bilan bog’lanish' },
    ],
    kirill: [
        { value: '', label: 'Қандай муаммоингиз  бор?' },
        { value: 'Фарзандсизлик', label: 'Фарзандсизлик' },
        { value: 'Эркаклардаги жинсий муамолар', label: 'Эркаклардаги жинсий муаммолар'},
        { value: 'Аёллардаги жинсий муаммолар', label: 'Аёллардаги жинсий муаммолар'},
        { value: 'Эгизак фарзанд кўриш', label: 'Эгизак фарзанд кўриш' },
        { value: 'Доктор билан боғланиш', label: 'Доктор билан боғланиш'},
    ],
    russian: [
        { value: '', label: 'Какая у вас проблема?' },
        { value: 'Бесплодие', label: 'Бесплодие' },
        { value: 'Сексуальные проблемы у мужчин', label: 'Сексуальные проблемы у мужчин'},
        { value: 'Сексуальные проблемы у женщин', label: 'Сексуальные проблемы у женщин'},
        { value: 'Рождение близнецов', label: 'Рождение близнецов' },
        { value: 'Связаться с врачом', label: 'Связаться с врачом' }
    ]
};

const placeholdersMap: { [key: string]: { fullname: string; phone: string; otherProblem: string, buttonText: string, buttonLoadingText: string, title: string, description: string } } = {
    uzbek: {
        fullname: 'Ism va familiyangiz',
        phone: 'Telefon raqamingiz',
        otherProblem: 'Boshqa muammo',
        buttonText: 'Yuborish',
        buttonLoadingText: 'Yuborilmoqda...',
        title: "So'rovingiz qabul qilindi",
        description: "Mutaxassisimiz tez oraqa siz bilan bog'lanadi!",
    },
    kirill: {
        fullname: 'Исм ва фамилиянгиз',
        phone: 'Телефон рақамингиз',
        otherProblem: 'Бошқа муаммо',
        buttonText: 'Юбориш',
        buttonLoadingText: 'Юборилмоқда...',
        title: "Суроғингиз қабул қилинди",
        description: "Мутахассисимиз тез орақа сиз билан боғланади!",
    },
    russian: {
        fullname: 'Ваше имя и фамилия',
        phone: 'Ваш номер телефона',
        otherProblem: 'Другая проблема',
        buttonText: 'Отправить',
        buttonLoadingText: 'Отправляется...',
        title: "Ваше сообщение отправлено",
        description: "Наш специалист свяжется с вами в ближайшее время!",
    }
};

interface FormProps {
    language: string;
}

export const Form: React.FC<FormProps> = ({ language }) => {
    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        problemSummary: '',
    });

    const [selectedProblem, setSelectedProblem] = useState<Option>(optionsMap[language][0]);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showOtherField, setShowOtherField] = useState<boolean>(false);

    const handleChange = (value: string, name: keyof typeof formData) => {
        if (name === 'problemSummary' && value === 'other') {
            setShowOtherField(true);
        } else if (name === 'problemSummary') {
            setShowOtherField(false);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const formatDate = (date: Date) => {
        const pad = (num: number) => num.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        let problemToSend = selectedProblem.value;
        if (showOtherField) {
            problemToSend = formData.problemSummary;
        } else if (selectedProblem.value === '') {
            problemToSend = selectedProblem.label; // Use label if value is empty
        }

        const scriptURL = 'https://script.google.com/macros/s/AKfycbyOTjeD-c0v2oi0wvIBeJr4MTVcf0yVTFbSb_HUayysr3m8dVGMSoXh0Q_zpBw0_tI45A/exec';

        try {
            const currentTime = formatDate(new Date());

            const response = await fetch(scriptURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    fullname: formData.fullname,
                    phone: formData.phone,
                    problemSummary: problemToSend,
                    createdAt: currentTime,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setModalOpen(true);
            setFormData({
                fullname: '',
                phone: '',
                problemSummary: '',
            });
            setSelectedProblem(optionsMap[language][0]);
            setShowOtherField(false);

            setTimeout(() => {
                setModalOpen(false);
            }, 5000);
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        setSelectedProblem(optionsMap[language][0]); // Reset selected problem when language changes
    }, [language]);

    return (
        <div className="w-full max-w-md mx-auto px-6 pt-2 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <Listbox value={selectedProblem} onChange={setSelectedProblem}>
                        <div className="relative">
                            <ListboxButton className="w-full flex justify-between items-center py-3 px-4 bg-white/50 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                {selectedProblem.label === '' ? 'Select a problem' : selectedProblem.label}
                                <FaChevronDown />

                            </ListboxButton>
                            <ListboxOptions className="absolute w-full mt-1 max-h-60 overflow-auto bg-white backdrop-blur-sm shadow-lg border border-gray-200 rounded-lg">
                                {optionsMap[language].map((option, idx) => (
                                    <ListboxOption
                                        key={idx}
                                        value={option}
                                        className={({ active }) =>
                                            `cursor-pointer select-none py-2 px-4 transition-colors ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-700'}`
                                        }
                                    >
                                        {option.label}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </div>
                    </Listbox>
                </div>

                <div>
                    <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={(e) => handleChange(e.target.value, 'fullname')}
                        placeholder={placeholdersMap[language].fullname}
                        required
                        className="w-full py-3 px-4 bg-white/50 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange(e.target.value, 'phone')}
                        onFocus={() => {
                            if (!formData.phone) {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    phone: '+998',
                                }));
                            }
                        }}
                        placeholder={placeholdersMap[language].phone}
                        required
                        className="w-full py-3 px-4 bg-white/50 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {showOtherField && (
                    <div>
                        <input
                            type="text"
                            name="otherProblem"
                            onChange={(e) => handleChange(e.target.value, 'problemSummary')}
                            placeholder={placeholdersMap[language].otherProblem}
                            required
                            className="w-full py-3 px-4 bg-white/50 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? placeholdersMap[language].buttonLoadingText : placeholdersMap[language].buttonText}
                </button>
            </form>

            {isModalOpen && (
                <Modal title={placeholdersMap[language].title} description={placeholdersMap[language].description} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
            )}
        </div>
    );
};
