export const faqData = [
  {
    id: "q1",
    question: "What is React and why use it?",
    answer:
      "React is a JavaScript library for building interactive user interfaces. It uses a virtual DOM to efficiently update and render UI components declaratively.",
  },
  {
    id: "q2",
    question: "What are React Hooks?",
    answer:
      "Hooks are functions like useState, useEffect, and useContext that let you use React features in functional components without writing class components. They were introduced in React 16.8.",
  },
  {
    id: "q3",
    question: "How does useState work?",
    answer:
      "useState lets you add local state to functional components. You call it with an initial value and get back a state value and setter function.",
  },
  {
    id: "q4",
    question: "What is useEffect used for?",
    answer:
      "useEffect handles side effects in functional components—like fetching data or subscriptions—by running after render based on dependency arrays. It replaces lifecycle methods.",
  },
  {
    id: "q5",
    question: "What is the Context API?",
    answer:
      "Context lets you share data across components without prop drilling by using a Provider and Consumer pattern. It's ideal for theme or auth state.",
  },
  {
    id: "q6",
    question: "What is props drilling and how do you avoid it?",
    answer:
      "Props drilling is passing props deeply through many layers. It's often avoided using Context API to pass values directly without intermediaries.",
  },
  {
    id: "q7",
    question: "What is useRef and how is it different from createRef?",
    answer:
      "useRef returns a mutable ref object that persists across renders without triggering re-renders. createRef creates a new ref on every render, mostly used in class components.",
  },
  {
    id: "q8",
    question: "What is useMemo and when would you use it?",
    answer:
      "useMemo memoizes expensive computations so they only recompute when dependencies change, avoiding unnecessary re-renders and improving performance.",
  },
  {
    id: "q9",
    question: "What are Higher Order Components (HOCs)?",
    answer:
      "HOCs are functions that take a component and return a new enhanced component, used to share behavior across components without repeating logic.",
  },
  {
    id: "q10",
    question: "What is virtual DOM and reconciliation?",
    answer:
      "The virtual DOM is React’s in-memory representation of the real DOM. During reconciliation, React diffs it and updates only the parts that changed, improving performance.",
  },
  {
    id: "q11",
    question: "What is React Portal and when is it used?",
    answer:
      "React Portal lets you render children into a DOM node outside the parent hierarchy, useful for modals, tooltips, or overlays.",
  },
  {
    id: "q12",
    question: "How do you handle errors in React?",
    answer:
      "Errors can be caught using Error Boundaries—class components with componentDidCatch and getDerivedStateFromError—to show fallback UI and prevent crashes.",
  },
];
