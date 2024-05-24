import { useState, useEffect, useRef } from "react";
import { Transformer, builtInPlugins } from 'markmap-lib';
import { Markmap, loadCSS, loadJS } from 'markmap-view';
import { useLocation } from 'react-router-dom';

const PsychologyAnalysis = () => {
    const location = useLocation();

    const [markdown, setMarkdown] = useState(`# Primacy Effect\n\n## Description\n 1. **The Primacy Effect highlights the significance of the first impression in shaping future interactions and relationships. It suggests that initial impressions, even if not entirely accurate, have a substantial impact on subsequent perceptions and behaviors.**\n\n## Analyzing the Primacy Effect\n\n### How It Can Affect User Behavior:\n\n1. **Strong First Impression**\n   - Users tend to place significant weight on their initial experience with a product or service, influencing how they perceive and engage with it in the future.\n\n2. **Confirmation Bias**\n   - Once a user forms an initial impression, they may subconsciously seek out information that aligns with their first impression, reinforcing their beliefs and behaviors.\n\n3. **Anchoring Effect**\n   - The first piece of information a user receives can serve as an anchor, shaping their decision-making process and evaluation of subsequent information.\n\n### How to Utilize It in Product Designing:\n\n1. **Onboarding Experience:**\n   - **Smooth Onboarding Process:** Ensure a user-friendly and engaging onboarding process to create a positive first impression and set the tone for future interactions.\n\n2. **Visual Design:**\n   - **Appealing UI/UX:** Design visually appealing interfaces that convey professionalism and credibility from the moment users engage with the product.\n\n3. **Customer Service:**\n   - **Prompt and Helpful Support:** Offer responsive customer service to address any initial concerns or questions, leaving users with a positive impression.\n\n4. **Content Curation:**\n   - **High-Quality Content:** Provide valuable and relevant content upfront to demonstrate expertise and build trust with users from the start.\n\n5. **Personalization:**\n   - **Tailored User Experience:** Use personalized elements to make users feel valued and understood right from their initial interaction with the product.\n\n### Example Applications:\n\n1. **E-commerce Platforms:**\n   - Showcase top-rated products or best sellers prominently on the homepage to create a positive first impression and guide users' browsing behavior.\n\n2. **Fitness Apps:**\n   - Offer a personalized workout plan or fitness assessment at the beginning to engage users and demonstrate the app's value from the start.\n\n3. **Educational Platforms:**\n   - Provide a well-structured and interactive introduction to the platform's features and courses to captivate users and encourage further exploration.\n\n4. **Financial Services:**\n   - Present clear and concise information on the benefits of the service or product right at the beginning to establish trust and interest.\n\n5. **Travel Websites:**\n   - Display stunning destination images and easy-to-use search functions at the outset to capture users' attention and interest in exploring more travel options.
  `);

    // let content = "what are the painpoints for those unemployed from countryside in IT industry. please output in markdown format, i need to display the result using markmap"
    const svgRef = useRef(null);
    const markmapInstanceRef = useRef(null);

    const [pid, setPid] = useState(1);

    useEffect(() => {
        if (location.state && location.state.pid) {
            setPid(location.state.pid);
            localStorage.setItem("pid", location.state.pid); // Save to local storage
        } else {
            const storedPid = localStorage.getItem("pid");
            if (storedPid) {
                setPid(storedPid);
            }
        }
        console.log("questionId log:", pid);
    }, [location.state]);


    useEffect(() => {
        const fetchData = () => {
            fetch(`http://127.0.0.1:8080/get-markdown/${pid}`)
                .then(response => response.json())
                .then(data => {

                    console.log("current results", data);
                    setMarkdown(data.markdown);
                }).catch(error => {
                    console.error('There was an error!', error);
                })
        };

        fetchData();
    }, [pid]);



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
            <svg ref={svgRef} style={{ width: '2900px', height: '1600px' }}></svg>
        </div>
    );
};
export default PsychologyAnalysis;
