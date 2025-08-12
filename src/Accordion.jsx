import { useState } from "react";
import { faqData } from "./utils/faqData";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#333446] rounded-md w-[75%] min-h">
      {faqData.map((faq, index) => (
        <div className="flex flex-col justify-center" key={faq.id}>
          <div
            className="bg-[#7f8caa] m-2 p-4 text-2xl text-slate-600 rounded-md font-bold cursor-pointer flex justify-between items-center"
            onClick={() => handleToggle(index)}
          >
            {faq.question}
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </div>
          {openIndex === index && (
            <div className="bg-[#eaefef] font-medium text-lg text-slate-600 m-2 p-2 rounded-md">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
