import React, { useEffect, useRef, useState } from 'react';
import { Transformer, builtInPlugins } from 'markmap-lib';
import { Markmap, loadCSS, loadJS } from 'markmap-view';
import { useResults } from "../landing/resultsContext.jsx";

const Painpoints = () => {

    const { painpoints } = useResults();

    console.log("current painpoints111:", painpoints);

    const [markdown, setMarkdown] = useState(`# Primacy Effect\n\n## Description\n 1. **The Primacy Effect highlights the significance of the first impression in shaping future interactions and relationships. It suggests that initial impressions, even if not entirely accurate, have a substantial impact on subsequent perceptions and behaviors.**\n\n## Analyzing the Primacy Effect\n\n### How It Can Affect User Behavior:\n\n1. **Strong First Impression**\n   - Users tend to place significant weight on their initial experience with a product or service, influencing how they perceive and engage with it in the future.\n\n2. **Confirmation Bias**\n   - Once a user forms an initial impression, they may subconsciously seek out information that aligns with their first impression, reinforcing their beliefs and behaviors.\n\n3. **Anchoring Effect**\n   - The first piece of information a user receives can serve as an anchor, shaping their decision-making process and evaluation of subsequent information.\n\n### How to Utilize It in Product Designing:\n\n1. **Onboarding Experience:**\n   - **Smooth Onboarding Process:** Ensure a user-friendly and engaging onboarding process to create a positive first impression and set the tone for future interactions.\n\n2. **Visual Design:**\n   - **Appealing UI/UX:** Design visually appealing interfaces that convey professionalism and credibility from the moment users engage with the product.\n\n3. **Customer Service:**\n   - **Prompt and Helpful Support:** Offer responsive customer service to address any initial concerns or questions, leaving users with a positive impression.\n\n4. **Content Curation:**\n   - **High-Quality Content:** Provide valuable and relevant content upfront to demonstrate expertise and build trust with users from the start.\n\n5. **Personalization:**\n   - **Tailored User Experience:** Use personalized elements to make users feel valued and understood right from their initial interaction with the product.\n\n### Example Applications:\n\n1. **E-commerce Platforms:**\n   - Showcase top-rated products or best sellers prominently on the homepage to create a positive first impression and guide users' browsing behavior.\n\n2. **Fitness Apps:**\n   - Offer a personalized workout plan or fitness assessment at the beginning to engage users and demonstrate the app's value from the start.\n\n3. **Educational Platforms:**\n   - Provide a well-structured and interactive introduction to the platform's features and courses to captivate users and encourage further exploration.\n\n4. **Financial Services:**\n   - Present clear and concise information on the benefits of the service or product right at the beginning to establish trust and interest.\n\n5. **Travel Websites:**\n   - Display stunning destination images and easy-to-use search functions at the outset to capture users' attention and interest in exploring more travel options.
  `);



    // let content = "what are the painpoints for those unemployed from countryside in IT industry. please output in markdown format, i need to display the result using markmap"
    const svgRef = useRef(null);
    const markmapInstanceRef = useRef(null);

    useEffect(() => {
        if (painpoints) {
            setMarkdown(painpoints);
            localStorage.setItem("results", painpoints);
        } else {
            if (localStorage.getItem("results")) {
                setMarkdown(markdown);
            } else {
                setMarkdown(localStorage.getItem("results"));
            }
        }
    }, [painpoints]);


    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     // Function to call the API
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('http://172.235.13.33:5001/analyze', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({ content: content })
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             const result = await response.json();
    //             console.log("result:", result);
    //             setMarkdown(result.text);
    //         } catch (error) {
    //             console.error('There was a problem with the fetch operation:', error);
    //         }
    //     };

    //     fetchData();
    // }, [content]);




    useEffect(() => {
        if (!markdown) return;

        const transformer = new Transformer([...builtInPlugins]);
        const { root, features } = transformer.transform(markdown);
        const { styles, scripts } = transformer.getUsedAssets(features);

        if (styles) loadCSS(styles);
        if (scripts) loadJS(scripts, { getMarkmap: () => window.markmap });

        // Clear the previous SVG content
        const svgEl = svgRef.current;
        if (svgEl) {
            svgEl.innerHTML = '';
        }

        if (svgEl) {
            // Create a new Markmap instance and store it in the ref
            markmapInstanceRef.current = Markmap.create(svgEl, {}, root);
        }
    }, [markdown]);

    return (
        <div>
            <svg ref={svgRef} style={{ width: '1800px', height: '1600px' }}></svg>
        </div>
    );
};

export default Painpoints;
