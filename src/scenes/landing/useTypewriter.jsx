import { useEffect, useState } from 'react';

const useTypewriter = (words, typeSpeed = 150, deleteSpeed = 100, delaySpeed = 1000) => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        if (!words || words.length === 0) return;

        let typingTimeout;

        const currentWord = words[wordIndex];
        const nextChar = currentWord ? currentWord.charAt(index) : '';

        if (isDeleting) {
            typingTimeout = setTimeout(() => {
                setText((prev) => prev.slice(0, -1));
                setIndex((prev) => prev - 1);
            }, deleteSpeed);
        } else {
            typingTimeout = setTimeout(() => {
                setText((prev) => prev + nextChar);
                setIndex((prev) => prev + 1);
            }, typeSpeed);
        }

        if (!isDeleting && text === currentWord) {
            setTimeout(() => setIsDeleting(true), delaySpeed);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
            setIndex(0);
        }

        return () => clearTimeout(typingTimeout);
    }, [text, isDeleting, words, wordIndex, index]);

    return text;
};

export default useTypewriter;
