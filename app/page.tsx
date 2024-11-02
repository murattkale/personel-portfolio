'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Folder, Terminal } from 'lucide-react'

export default function Home() {
  const [activeFile, setActiveFile] = useState('about.js')
  const [displayedText, setDisplayedText] = useState('')
  const [showMainContent, setShowMainContent] = useState(false)

  const greetingText = "Would you like to get to know Murat Kale? (Press Enter)";
  
  const files = [
    { name: 'about.js', type: 'javascript' },
    { name: 'experience.py', type: 'python' },
    { name: 'skills.cpp', type: 'cpp' },
    { name: 'education.java', type: 'java' },
    { name: 'contact.html', type: 'html' },
  ]

  const fileContents = {
    'about.js': `
const aboutMe = {
  name: "Murat Kale",
  role: "Full Stack Developer",
  description: "Focused on building scalable software solutions with expertise in distributed architectures.",
  expertise: [
    "DotNet Core", "DDD", "TDD", "Microservices", "AI Integration",
    "DevOps", "Distributed Architecture", "React", "Entity Framework Core"
  ]
};
console.log(JSON.stringify(aboutMe, null, 2));
`,
    'experience.py': `
class Experience:
    def __init__(self, company, role, period, description):
        self.company = company
        self.role = role
        self.period = period
        self.description = description

experiences = [
    Experience("Atlastek Teknoloji", "Full Stack Developer", "12.2023 - 09.2024",
               "Developed CRM and IRP solutions for fuel and payment systems, focusing on operational efficiency."),
    Experience("Hybrid", "Software Dev. Team Leader", "04.2019 - 12.2023",
               "Integrated banking, ERP, and CRM systems with machine risk analysis and ISO standards."),
    Experience("Işık University", "Software Dev. Team Leader", "05.2018 - 04.2019",
               "Developed Campus Online student automation system using DotNet Core and web APIs."),
    Experience("Demirören Media", "Full Stack Developer", "10.2017 - 05.2018",
               "Integrated Milliyet systems with 120+ foreign services using NoSQL, ElasticSearch, and Redis."),
    Experience("Spexco", "Full Stack Developer", "11.2016 - 10.2017",
               "Developed election result systems and ISKI project tracking for Istanbul water management."),
    Experience("Detur Group", "Full Stack Developer", "10.2014 - 11.2016",
               "Managed Scandinavian tourism systems with dynamic content for flight and hotel info."),
    Experience("DevTech", "Full Stack Developer", "01.2010 - 10.2014",
               "Created access control, route automation, and accounting systems with extensive reporting.")
]

for exp in experiences:
    print(f"{exp.role} at {exp.company} ({exp.period})\\n{exp.description}\\n")
`,
    'skills.cpp': `
#include <iostream>
#include <vector>
#include <string>

int main() {
  std::vector<std::string> skills = {
    "DDD", "TDD", "Docker", "RabbitMQ", "Microservices", "DevOps",
    "DotNet Core", "ElasticSearch", "RedisCache", "Entity Framework", "NHibernate",
    "React", "React Native", "CQRS", "MVC", "MongoDB", "PostgreSQL", "MSSQL"
  };

  std::cout << "Skills:\\n";
  for (const auto& skill : skills) {
    std::cout << "- " << skill << "\\n";
  }

  return 0;
}
`,
    'education.java': `
public class Education {
    public static void main(String[] args) {
        String[][] education = {
            {"Anadolu University", "Bachelor's in Public Administration", "2014 - Present"},
            {"Balikesir University", "Associate's in Computer Programming", "2012 - 2014"}
        };

        System.out.println("Education:");
        for (String[] edu : education) {
            System.out.printf("%s\\n%s (%s)\\n\\n", edu[0], edu[1], edu[2]);
        }
    }
}
`,
    'contact.html': `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Murat Kale</title>
</head>
<body>
    <h1>Contact Information</h1>
    <ul>
        <li>Email: <a href="mailto:murat.kale9339@gmail.com">murat.kale9339@gmail.com</a></li>
        <li>Phone: +90 (530) 511 71 27</li>
        <li>LinkedIn: <a href="https://www.linkedin.com/in/muratkale" target="_blank">linkedin.com/in/muratkale</a></li>
        <li>GitHub: <a href="https://github.com/murattkale" target="_blank">github.com/murattkale</a></li>
    </ul>
</body>
</html>
`,
  }


  useEffect(() => {
    // Hem Enter tuşuna hem de dokunma olaylarına yanıt veren fonksiyon
    const handleContinue = () => {
      setShowMainContent(true);
    };

    // Enter tuşuna basıldığında tetiklenen olay dinleyicisi
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleContinue();
      }
    };

    // Dokunma olayları (dokunma) için olay dinleyicisi
    const handleTouchStart = () => {
      handleContinue();
    };

    // Olay dinleyicilerini ekle
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouchStart);

    // Temizleme: Bileşen kaldırıldığında olay dinleyicilerini kaldır
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []); // Boş bağımlılık dizisi, bunun yalnızca bileşen bağlandığında bir kez çalışmasını sağlar


  // Show greeting message letter by letter
  useEffect(() => {
    let index = 0
    setDisplayedText('')
    
    const interval = setInterval(() => {
      if (index < greetingText.length-1) {
        setDisplayedText((prev) => prev + greetingText[index])
        index++
      } else {
        clearInterval(interval)
      }
    }, 30) // Letter display speed

    return () => clearInterval(interval)
  }, [])

 
  // Show content of the selected file
  useEffect(() => {
    if (showMainContent) {
      let index = 0
      setDisplayedText('')
      const content = fileContents[activeFile]

      const interval = setInterval(() => {
        if (index < content.length-1) {
          setDisplayedText((prev) => prev + content[index])
          index++
        } else {
          clearInterval(interval)
        }
      }, 1)

      return () => clearInterval(interval)
    }
  }, [activeFile, showMainContent])

  
  return (
    <div className={`min-h-screen text-green-400 p-8 font-mono bg-black`}>
      {!showMainContent ? (
        <div className="flex items-center justify-center h-screen">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-green-400">
              <Terminal className="inline-block" />
              <span className="ml-2">{displayedText}</span>
            </div>
          </motion.div>
        </div>
      ) : (
        <main className="max-w-4xl mx-auto p-8 rounded-lg shadow-xl border border-green-500 neomorphic">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-2 text-green-400 glow-effect">Murat Kale</h1>
            <h2 className="text-2xl text-green-600">Full Stack Developer</h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-green-400">
                <Folder className="mr-2" /> Project Files
              </h3>
              <ul className="space-y-2">
                {files.map((file) => (
                  <motion.li key={file.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => setActiveFile(file.name)}
                      className="text-left text-green-500 hover:underline"
                    >
                      {file.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="lg:w-3/4">
              <h3 className="text-lg font-semibold mb-4 text-green-400">File Content:</h3>
              <div className="border border-green-500 rounded-lg p-4 overflow-auto neomorphic">
                <AnimatePresence>
                  <motion.pre
                    key={activeFile}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm overflow-x-auto text-green-400 neon-text"
                  >
                    <code>{displayedText}</code>
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
      )}

      <style jsx>{`
        .glow-effect {
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.7), 0 0 20px rgba(0, 255, 0, 0.7);
        }
        .neon-text {
          color: #00ff00;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.8);
        }
        .neomorphic {
          background: #1c1c1c; /* Arka plan rengi */
          border-radius: 15px;
          box-shadow: 
            8px 8px 15px rgba(0, 0, 0, 0.4),
            -8px -8px 15px rgba(255, 255, 255, 0.1);
          transition: box-shadow 0.3s ease;
        }
        .neomorphic:hover {
          box-shadow: 
            5px 5px 20px rgba(0, 0, 0, 0.5),
            -5px -5px 20px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}