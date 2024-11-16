export const splitIntoSentences = (paragraph) => {
    if (!paragraph) return [];

    // catch common abbreviations that end with fullstops
    const abbreviations = ['dr.', 'mr.', 'mrs.', 'ms.', 'prof.', 'sr.', 'jr.', 'etc.', 'inc.', 'ltd.', 'co.'];
    const abbrRegex = new RegExp(
        `\\b(${abbreviations.join('|')})\\s+`,
        'gi'
    );

    // replace with temporary marker
    const withProtectedAbbr = paragraph.replace(
        abbrRegex,
        (match) => match.replace('.', '__ABBR__')
    );

    // replace fullstops between letters/numbers with temporary marker
    const withProtectedFullstops = withProtectedAbbr.replace(
        /(?<=\w)\.(?=\w)/g,
        '__FULLSTOP__'
    );

    // split text into sentences
    const sentenceRegex = /[^.!?]+[.!?]+/g;
    const matches = withProtectedFullstops.match(sentenceRegex) || [];

    // process each sentence, restoring protected abbreviations
    const sentences = matches.map(sentence => {
        return sentence
            .trim()
            .replace(/\./g, '')
            .replace(/__FULLSTOP__/g, '.')
            .replace(/__ABBR__/g, '.');
    });

    // handle any remaining text
    const lastIndex = matches.join('').length;
    const remaining = withProtectedFullstops.slice(lastIndex).trim();
    
    if (remaining) {
        sentences.push(
            remaining
                .replace(/__FULLSTOP__/g, '.')
                .replace(/__ABBR__/g, '.')
        );
    }

    // clean up quotation marks and spaces
    return sentences.map(sentence => {
        return sentence
            .replace(/"/g, '')
            .trim();
    });
};

export const cleanMessage = (text) => {
    return text.endsWith('.') ? text.slice(0, -1) : text;
};

export const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 17) return "Good afternoon";
    return "Good evening";
};