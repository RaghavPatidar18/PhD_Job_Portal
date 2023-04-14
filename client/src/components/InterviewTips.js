import React from "react";
import "./css/interview.css";


const InterviewTips = () => {
    const tips = [
        {
          title: "Prepare and Research",
          description:
            "Research the company thoroughly, including its history, values, products/services, competitors, and recent news. Understand the job requirements and align your skills and qualifications with them. Prepare answers for common interview questions and practice delivering them.",
        },
        {
          title: "Dress Professionally",
          description:
            "Dress appropriately for the interview, considering the company's culture, dress code, and professional standards. Choose clean, ironed, and well-fitting attire that reflects your professionalism and respect for the interview process.",
        },
        {
          title: "Practice and Rehearse",
          description:
            "Practice your answers to commonly asked interview questions, including behavioral, situational, and technical questions. Also, rehearse your body language, tone, and overall communication style to come across as confident and articulate during the interview.",
        },
        {
          title: "Ask Questions",
          description:
            "Prepare thoughtful and relevant questions to ask the interviewer about the company, team, culture, projects, and the role you're applying for. This shows your genuine interest in the position and helps you gather valuable information about the company.",
        },
        {
          title: "Stay Confident",
          description:
            "Believe in yourself and your abilities. Maintain eye contact with the interviewer, use positive body language, and showcase your skills and qualifications with confidence. Speak clearly, concisely, and authentically, and provide examples to back up your claims.",
        },
        {
          title: "Follow-up",
          description:
            "Send a thank you email or note within 24 hours of the interview to express gratitude for the opportunity and reiterate your interest in the position. Mention specific points from the interview to show that you were attentive and engaged during the conversation.",
        },
        {
          title: "Research the Interviewer",
          description:
            "Look up the interviewer's background, role, and interests on professional networking sites like LinkedIn. This can help you establish rapport during the interview and tailor your answers based on the interviewer's perspective and expectations.",
        },
        {
          title: "Be Honest and Authentic",
          description:
            "Be honest about your skills, experience, and qualifications. Avoid exaggerating or misrepresenting your abilities. Showcase your unique qualities and experiences that make you a good fit for the role. Authenticity and transparency are highly valued by employers.",
        },
        {
          title: "Demonstrate Your Skills",
          description:
            "Back up your claims with concrete examples of how you have demonstrated the skills required for the job in your past experiences. Use the STAR method (Situation, Task, Action, Result) to structure your responses and provide evidence of your capabilities.",
        },
        {
          title: "Be Punctual and Organized",
          description:
            "Arrive on time for the interview, preferably 10-15 minutes early. Plan your route in advance, dress appropriately, and bring extra copies of your resume, references, and any other documents as required. Being punctual and organized shows professionalism and respect for the interviewer's time.",
        },
        {
          title: "Showcase Your Fit with the Company",
          description:
            "Highlight how your skills, experience, and values align with the company's culture, mission, and goals. Demonstrate your enthusiasm for the company and the specific role you're applying for. Employers value candidates who are genuinely interested in their organization.",
        },
        {
          title: "Listen Carefully",
          description:
            "Pay attention to the interviewer's questions and listen carefully to their responses to ensure you fully understand their expectations and can provide relevant and thoughtful answers. Avoid interrupting or rushing to respond, and take a moment to gather your thoughts before answering. Active listening shows respect and professionalism during the interview process.",
        },
        {
        title: "Be Positive and Enthusiastic",
        description:
        "Maintain a positive attitude throughout the interview, and convey your enthusiasm for the position and the company. Smile, engage in conversation, and show genuine interest in what the interviewer has to say. Positive energy and enthusiasm can leave a lasting impression on the interviewer.",
        },
        {
        title: "Highlight Your Achievements",
        description:
        "Share specific examples of your achievements, accomplishments, and contributions in your previous roles. Use quantifiable data, such as metrics or numbers, to demonstrate the impact of your work. This showcases your results-oriented mindset and adds credibility to your qualifications.",
        },
        {
        title: "Be Professional and Polite",
        description:
        "Maintain a professional and courteous demeanor throughout the interview, even if faced with challenging questions or situations. Avoid negative comments about past employers or colleagues, and refrain from using inappropriate language. Professionalism and politeness reflect your maturity and suitability for the job.",
        },
        {
        title: "Be Flexible and Adaptive",
        description:
        "Demonstrate your ability to adapt to changing situations and be flexible in your approach. Showcase your problem-solving skills and your willingness to learn and grow. Employers value candidates who can adapt to new environments and challenges with a positive and proactive mindset.",
        },
        {
        title: "Follow the STAR Method",
        description:
        "Use the STAR method (Situation, Task, Action, Result) to structure your responses to behavioral or situational questions. Describe the specific situation or task, the actions you took, and the results or outcomes you achieved. This provides a clear and structured framework for your answers and helps you showcase your skills effectively.",
        }
        ];      

        const topQuestions = [
            {
            question: "Tell me about a time when you demonstrated leadership skills in a professional setting.",
            answer:
            "In my previous role as a team leader, I faced a situation where a team member was struggling with a project. I took the initiative to mentor and coach the team member, provided clear guidance, and motivated them to overcome challenges. As a result, the team member improved their performance, and we successfully completed the project on time.",
            },
            {
            question: "How do you handle tight deadlines and multiple priorities?",
            answer:
            "I am skilled at managing my time effectively and prioritizing tasks based on their urgency and importance. When faced with tight deadlines and multiple priorities, I first assess the situation, create a plan, and break down tasks into smaller manageable steps. I then focus on one task at a time, communicate with my team, and stay organized to ensure all deadlines are met.",
            },
            {
            question: "Describe a situation where you had to resolve a conflict with a colleague or team member.",
            answer:
            "In a previous role, I had a disagreement with a colleague over a project approach. Instead of letting the conflict escalate, I initiated a one-on-one conversation with the colleague, actively listened to their perspective, and expressed my own in a respectful manner. We brainstormed solutions together and found a compromise that was beneficial for the project and our working relationship.",
            },
            {
            question: "How do you handle unexpected changes or setbacks in the workplace?",
            answer:
            "I understand that unexpected changes or setbacks are inevitable in the workplace. When faced with such situations, I remain calm and composed, assess the situation objectively, and identify potential solutions. I seek input from colleagues or supervisors, collaborate with the team to come up with a plan, and adapt my approach as needed to overcome the challenge and achieve the desired outcome.",
            },
            {
            question: "Tell me about a time when you took initiative to improve a process or solve a problem.",
            answer:
            "In my previous role, I noticed a bottleneck in the workflow that was causing delays. I proactively conducted research, gathered data, and proposed a solution to optimize the process. I presented my findings to the team and collaborated with them to implement the changes. As a result, we streamlined the process, reduced delays, and improved overall efficiency.",
            },
            {
            question: "How do you handle stressful situations or high-pressure environments?",
            answer:
            "I thrive in challenging situations and high-pressure environments. When faced with stress or pressure, I remain focused and composed, prioritize tasks, and take a systematic approach to problem-solving. I also make sure to take care of my well-being by practicing stress-relief techniques, such as deep breathing or taking short breaks, to maintain a clear and focused mindset.",
            }
            ];

            const sampleque = [
                {
                  question: "Tell me about your experience with [specific skill or technology relevant to the job].",
                  answer: "In my previous role at [company name], I gained extensive experience in [specific skill or technology] through various projects and tasks. I successfully [describe relevant achievements or outcomes]. I am confident in my ability to apply this expertise to contribute to the success of [current company/job role].",
                },
                {
                  question: "How do you handle tight deadlines and competing priorities?",
                  answer: "I am well-versed in managing tight deadlines and competing priorities. I prioritize tasks based on their urgency and importance, create a timeline or schedule, and communicate with team members to ensure everyone is aligned. I am also skilled in multitasking and have experience in handling multiple projects simultaneously without compromising on quality.",
                },
                {
                  question: "Can you tell me about a time when you had to handle a difficult team member or customer?",
                  answer: "In my previous role, I encountered a difficult team member who was not aligned with the team's goals. I proactively initiated a one-on-one meeting, actively listened to their concerns, and offered solutions to address the issues. Through open communication and conflict resolution techniques, I was able to build a positive working relationship with the team member and achieve a successful outcome.",
                },
                {
                  question: "Describe a time when you faced a major setback or failure at work and how you handled it.",
                  answer: "During a project at [company name], we encountered a major setback due to unforeseen challenges. Instead of dwelling on the failure, I immediately analyzed the situation, identified the root cause, and developed a corrective action plan. I proactively communicated with the team, rallied their support, and together, we implemented the necessary changes to turn the situation around and successfully complete the project.",
                },
                {
                  question: "Tell me about a time when you had to adapt to a change in a work environment or company culture.",
                  answer: "In my previous role, our company went through a merger, resulting in a significant change in the work environment and company culture. I quickly adapted by actively participating in team-building activities, engaging in open communication with colleagues, and embracing the new culture. I also proactively sought opportunities to contribute my skills and expertise to support the team during the transition, which helped me successfully integrate into the new environment.",
                },
                {
                  question: "How do you handle feedback from supervisors or team members?",
                  answer: "I appreciate feedback and see it as an opportunity for growth. I actively seek feedback from supervisors and team members, listen attentively, and take feedback in a constructive manner. I ask clarifying questions to fully understand the feedback and take appropriate action to improve my performance. I also provide feedback to others in a respectful and constructive manner to foster a culture of continuous improvement and collaboration.",
                }
              ];
              
              // Add more sample questions and answers as needed
              


              const interviewprocess = [
                {
                  step: "Initial screening",
                  description: [
                    "The initial screening is the first step in the interview process, where the employer reviews the resumes or applications of candidates to assess their qualifications and fit for the position.",
                    "This step may involve a thorough review of the candidate's work experience, skills, education, and other relevant qualifications.",
                    "The screening process may also include checking for any red flags, such as gaps in employment history or discrepancies in the candidate's information.",
                    "Based on the initial screening, the employer may shortlist candidates who meet the minimum qualifications for further evaluation.",
                  ],
                },
                {
                  step: "Phone interview",
                  description: [
                    "The phone interview is a common step in the interview process, where the employer conducts a series of phone questions with shortlisted candidates to further assess their skills, experience, and fit for the position.",
                    "Phone interviews may involve technical questions related to the job requirements, as well as behavioral questions to assess the candidate's work style, problem-solving abilities, and communication skills.",
                    "Phone interviews are typically shorter in duration compared to in-person interviews and serve as an initial screening to narrow down the pool of candidates for further evaluation.",
                  ],
                },
                {
                  step: "Technical assessment",
                  description: [
                    "The technical assessment is a step in the interview process that evaluates the candidate's technical knowledge and abilities related to the job requirements.",
                    "This step may involve technical tests, coding exercises, or practical demonstrations to assess the candidate's skills in areas such as programming, data analysis, system administration, or other technical skills relevant to the position.",
                    "Technical assessments are commonly used for positions that require specific technical expertise, such as software development, IT roles, or engineering roles.",
                  ],
                },
                {
                  step: "In-person interview",
                  description: [
                    "The in-person interview is a critical step in the interview process where shortlisted candidates are invited for a face-to-face meeting with the hiring team.",
                    "In-person interviews may include one-on-one or panel interviews with hiring managers, team members, or other stakeholders.",
                    "During the in-person interview, candidates may be asked a wide range of questions related to their skills, experience, problem-solving abilities, work style, and fit with the company culture.",
                    "In-person interviews also provide an opportunity for candidates to ask questions about the company, team, and role, and get a better understanding of the company's values, goals, and expectations.",
                  ],
                }
            ]


  return (
    <div className="interview-container">
      <div className="menu-container bg-gray-200 px-4 py-2">
  {/* Menu items */}
  <a href="#interview-tips" className="text-gray-700 mx-2 hover:text-gray-900">
    <div className="menu-item p-2 rounded-md bg-white w-40">Interview Tips</div>
  </a>
  <a href="#top-asked-questions" className="text-gray-700 mx-2 hover:text-gray-900">
    <div className="menu-item p-2 rounded-md bg-white w-40">Top Asked Questions</div>
  </a>
  <a href="#sample-questions" className="text-gray-700 mx-2 hover:text-gray-900">
    <div className="menu-item p-2 rounded-md bg-white w-40">Sample Questions</div>
  </a>
  <a href="#interview-process" className="text-gray-700 mx-2 hover:text-gray-900">
    <div className="menu-item p-2 rounded-md bg-white w-40">Interview Process</div>
  </a>
  
  {/* Add other menu items as needed */}
</div>



      <div id="interview-tips" className="interview-tips-container">
        {/* Interview Tips section */}
        <h3 className="interview-tips-title">Interview Tips</h3>
        <div className="interview-tips-list">
          {tips.map((tip, index) => (
            <div className="interview-tips-item" key={index}>
              <h2 className="interview-tips-item-title">{tip.title}</h2>
              <p className="interview-tips-item-description">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div id="top-asked-questions" className="interview-tips-container">
        {/* Top Asked Questions section */}
        <h1 className="top-asked-questions-title">Top Asked Questions</h1>
        <div className="top-asked-questions-list">
          {topQuestions.map((question, index) => (
            <div className="top-asked-questions-item" key={index}>
              <h5 className="top-asked-questions-item-title">
                {question.question}
              </h5>
              <p className="top-asked-questions-item-answer">
                {question.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div id="sample-questions" className="interview-tips-container">
        {/* Sample Questions section */}
        <h1 className="top-asked-questions-title">Sample Questions</h1>

        <div className="top-asked-questions-list">
          {sampleque.map((question, index) => (
            <div className="top-asked-questions-item" key={index}>
              <h5 className="top-asked-questions-item-title">
                {question.question}
              </h5>
              <p className="top-asked-questions-item-answer">
                {question.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Add content for sample questions section */}
      </div>

      <div id="interview-process" className="interview-tips-container">
        {/* Interview Process section */}
        <h1 className="top-asked-questions-title">Interview Process</h1>

        <div className="top-asked-questions-list">
          {interviewprocess.map((question, index) => (
            <div className="top-asked-questions-item" key={index}>
              <h5 className="top-asked-questions-item-title">
                {question.step}
              </h5>
              <p className="top-asked-questions-item-answer">
                {question.description}
              </p>
            </div>
          ))}
        </div>


        {/* Add content for interview process section */}
      </div>

    </div>
);

};

export default InterviewTips;