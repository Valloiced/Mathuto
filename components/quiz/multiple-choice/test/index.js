const sampleData = {
    id: 'Hk9vojTy8zAlqreedioJ',
    questions: [
        {
            incorrectAnswers: ['Aurora Borealis', 'Volcanic Eruptions', 'Earthquakes'],
            question:
                'Which natural phenomenon is often associated with the Fibonacci sequence, showcasing a spiral pattern?',
            correctAnwer: 'Seashells'
        },
        {
            incorrectAnswers: ['Golden Ratio', "Euler's Number", 'Prime Number'],
            question:
                "What mathematical concept is commonly represented by the ratio of a circle's circumference to its diameter?",
            correctAnwer: 'Pi (π)'
        }
        // {
        //     incorrectAnswers: ['24', '26', '31'],
        //     question: 'What is the next number in the Fibonacci sequence after 5, 8, 13, 21?',
        //     correctAnwer: '34'
        // },
        // {
        //     incorrectAnswers: ['3', '5', '8'],
        //     question:
        //         'In the Fibonacci sequence, if F(0) = 0 and F(1) = 1, what is the value of F(5)?',
        //     correctAnwer: '13'
        // },
        // {
        //     incorrectAnswers: ['Approximately 2.718', 'Approximately 3.142', 'Approximately 1.414'],
        //     question:
        //         'What is the ratio of consecutive Fibonacci numbers as you move further in the sequence?',
        //     correctAnwer: 'Approximately 1.618'
        // },
        // {
        //     incorrectAnswers: [
        //         'It provides entertainment.',
        //         'It creates chaos.',
        //         'It is only useful for academic purposes.'
        //     ],
        //     question: 'Why is mathematics considered valuable in understanding the world?',
        //     correctAnwer: 'It helps organize patterns and regularities.'
        // },
        // {
        //     incorrectAnswers: [
        //         'Creating randomness.',
        //         'Organizing chaos.',
        //         'Generating confusion.'
        //     ],
        //     question: 'What is one of the primary roles of mathematics in various fields?',
        //     correctAnwer: 'Identifying and understanding patterns.'
        // },
        // {
        //     incorrectAnswers: [
        //         'Because it provides entertainment.',
        //         'Because it has no real-world applications.',
        //         'Because it is only relevant in the field of literature.'
        //     ],
        //     question:
        //         'Why is mathematics considered a valuable tool in understanding the behavior of nature and phenomena in the world?',
        //     correctAnwer: 'Because it helps predict and explain natural occurrences.'
        // },
        // {
        //     incorrectAnswers: [
        //         'Mathematics is only useful in theoretical discussions.',
        //         'Mathematics has no connection to the physical world.',
        //         'Mathematics is primarily an artistic expression.'
        //     ],
        //     question:
        //         'Which of the following statements best reflects the role of mathematics in predicting the behavior of nature?',
        //     correctAnwer:
        //         'Mathematics helps describe patterns and relationships in the natural world.'
        // },
        // {
        //     incorrectAnswers: [
        //         'By influencing human emotions and behaviors.',
        //         'By creating fictional worlds in literature.',
        //         'By discovering new species in the natural environment.'
        //     ],
        //     question:
        //         'How does mathematics contribute to controlling nature and occurrences in the world for our own ends?',
        //     correctAnwer: 'By predicting weather patterns and natural disasters.'
        // },
        // {
        //     incorrectAnswers: [
        //         'By influencing political decisions.',
        //         'By providing insights into economic trends.',
        //         'By determining artistic preferences.'
        //     ],
        //     question:
        //         'In what way does mathematics help us understand and manipulate natural phenomena?',
        //     correctAnwer: 'By establishing patterns and relationships in nature.'
        // },
        // {
        //     incorrectAnswers: [
        //         'Because it is a subject taught in schools',
        //         'Because it is an ancient discipline',
        //         'Because it is easy to understand'
        //     ],
        //     question: 'Why is Mathematics considered indispensable in the world?',
        //     correctAnwer: 'Because it has numerous applications in various fields'
        // },
        // {
        //     incorrectAnswers: [
        //         'Its popularity among students',
        //         'Its historical significance',
        //         'Its inclusion in academic curricula'
        //     ],
        //     question: 'What is a key reason for the indispensability of Mathematics in the world?',
        //     correctAnwer: 'Its ability to solve realworld problems'
        // },
        // {
        //     incorrectAnswers: [
        //         'Verbose, vague, redundant',
        //         'Informal, lengthy, ambiguous',
        //         'Descriptive, wordy, weak'
        //     ],
        //     question: 'What are the characteristics of mathematical language?',
        //     correctAnwer: 'Precise, concise, powerful'
        // },
        // {
        //     incorrectAnswers: [
        //         'Sentences are made up of variables and constants, while expressions consist of mathematical operations.',
        //         'Expressions provide statements about equality, while sentences involve the combination of terms.',
        //         'Sentences are only used in algebra, while expressions are applicable in various mathematical contexts.'
        //     ],
        //     question:
        //         'What is the main distinction between mathematical expressions and sentences?',
        //     correctAnwer:
        //         'Expressions contain numbers and operations, while sentences convey complete thoughts.'
        // },
        // {
        //     incorrectAnswers: [
        //         'Representing values or terms',
        //         'Containing variables and constants',
        //         'Evaluating mathematical operations'
        //     ],
        //     question:
        //         'What is the primary distinction between mathematical expressions and mathematical sentences?',
        //     correctAnwer: 'Stating a complete thought'
        // },
        // {
        //     incorrectAnswers: [
        //         'Addition, Multiplication, Division, Subtraction',
        //         'Multiplication, Addition, Subtraction, Division',
        //         'Division, Subtraction, Addition, Multiplication'
        //     ],
        //     question: 'What is the correct order of operations in mathematics?',
        //     correctAnwer: 'Parentheses, Exponents, Multiplication, Division, Addition, Subtraction'
        // },
        // {
        //     incorrectAnswers: [
        //         'Commutative Property',
        //         'Associative Property',
        //         'Distributive Property'
        //     ],
        //     question:
        //         'In mathematical expressions, which convention is followed when solving from left to right?',
        //     correctAnwer: 'Order of Operations'
        // },
        // {
        //     incorrectAnswers: [
        //         'A well-organized collection of data',
        //         'A mathematical expression',
        //         'A sequence of numbers'
        //     ],
        //     question: 'What is the definition of a set?',
        //     correctAnwer: 'An unordered collection of distinct elements'
        // },
        // {
        //     incorrectAnswers: [
        //         'Each input has multiple outputs',
        //         'Each output has multiple inputs',
        //         'Outputs are not related to inputs'
        //     ],
        //     question: 'In a mathematical context, what characterizes a function?',
        //     correctAnwer: 'Each input has a unique output'
        // },
        // {
        //     incorrectAnswers: [
        //         'A connection between unrelated concepts',
        //         'A complex mathematical equation',
        //         'A variable in an algebraic expression'
        //     ],
        //     question: 'What is a relation in mathematics?',
        //     correctAnwer: 'A set of ordered pairs'
        // },
        // {
        //     incorrectAnswers: [
        //         'Combining three elements',
        //         'Inverting an element',
        //         'Operating on a single element'
        //     ],
        //     question: 'What does a binary operation involve?',
        //     correctAnwer: 'Combining two elements to produce a third'
        // },
        // {
        //     incorrectAnswers: ['Some cats can fly', 'All cats cannot fly', 'Cats may fly'],
        //     question: 'What is the negation of the statement: "All cats can fly"?',
        //     correctAnwer: 'No cats can fly'
        // },
        // {
        //     incorrectAnswers: ['Disjunction', 'Negation', 'Implication'],
        //     question: 'Which logical connective is represented by the symbol "∧"?',
        //     correctAnwer: 'Conjunction'
        // },
        // {
        //     incorrectAnswers: ['p ∨ q', 'p ⊃ q', '¬p'],
        //     question:
        //         'If "p" represents "The sun is shining" and "q" represents "It\'s a clear day," what is the symbolic representation of "The sun is shining and it\'s a clear day"?',
        //     correctAnwer: 'p ∧ q'
        // },
        // {
        //     incorrectAnswers: [
        //         '∀x (Dog(x) ∨ Barks(x))',
        //         '∃x (Dog(x) ∨ Barks(x))',
        //         '∀x (Dog(x) ∧ Barks(x))'
        //     ],
        //     question:
        //         'What is the existential quantifier notation for the statement: "There exists a dog that barks"?',
        //     correctAnwer: '∃x (Dog(x) ∧ Barks(x))'
        // },
        // {
        //     incorrectAnswers: [
        //         'They are optional and can be skipped.',
        //         'They are only required in advanced mathematics.',
        //         'They are discouraged to keep mathematical discussions more accessible.'
        //     ],
        //     question:
        //         'In formal mathematics, which of the following statements is true about proofs?',
        //     correctAnwer:
        //         'They are essential for establishing the validity of mathematical arguments.'
        // },
        // {
        //     incorrectAnswers: [
        //         'Axioms are unnecessary in formal mathematics.',
        //         'Axioms are used to introduce ambiguity.',
        //         'Axioms are only relevant in applied mathematics.'
        //     ],
        //     question: 'What is the role of axioms in formal mathematical systems?',
        //     correctAnwer:
        //         'Axioms serve as the foundational rules from which mathematical theorems are derived.'
        // },
        // {
        //     incorrectAnswers: [
        //         'Informal language with loosely defined terms.',
        //         'Precision is not important in formal mathematics.',
        //         'Precision is only necessary in geometry.'
        //     ],
        //     question:
        //         'Which of the following best describes the level of precision expected in formal mathematical language?',
        //     correctAnwer: 'Precise and unambiguous language with well-defined terms.'
        // },
        // {
        //     incorrectAnswers: [
        //         'Formal proofs are longer and more complex.',
        //         'Formal proofs are only used in pure mathematics.',
        //         'Informal proofs are not based on mathematical principles.'
        //     ],
        //     question: 'What distinguishes a formal proof from an informal one?',
        //     correctAnwer:
        //         'Formal proofs adhere to strict rules of logical inference and are machinecheckable.'
        // }
    ],
    details: {
        title: 'PRETEST',
        type: 'multiple-choice',
        createdOn: {
            _seconds: 1715342885,
            _nanoseconds: 259000000
        },
        numOfQuestions: 2,
        description: 'This serves as a pretest for "Mathematics in the Modern World" module.',
        topic_id: 'WTBm3ooevW9Hnokvr3XU'
    }
};

export default sampleData;
