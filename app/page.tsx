'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Folder, File, Terminal } from 'lucide-react'

export default function Home() {
  const [activeFile, setActiveFile] = useState('about.js')

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
  description: "Passionate about creating efficient and scalable solutions for complex software systems.",
  expertise: ["DDD", "TDD", "Microservices", "AI Integration"]
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
               "Developed web-based CRM and IRP solutions"),
    Experience("Hybrid", "Software Development Team Leader", "04.2019 - 12.2023", 
               "Led integrations for banking and e-commerce systems")
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
        "DDD", "TDD", "Microservices", "Docker", "RabbitMQ",
        "DotNet Core", "Entity Framework", "React", "React Native",
        "MongoDB", "PostgreSQL", "MSSQL", "AI Engineering"
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
            {"Balikesir University", "Associate's Degree in Computer Programming", "2012 - 2014"}
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

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-8 font-mono">
      <main className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">Murat Kale</h1>
          <h2 className="text-2xl text-green-600">Full Stack Developer</h2>
        </motion.div>

        <div className="flex">
          <div className="w-1/4 pr-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Folder className="mr-2" /> Project Files
              </h3>
              <ul>
                {files.map((file) => (
                  <motion.li
                    key={file.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => setActiveFile(file.name)}
                      className={`w-full text-left py-2 px-4 rounded ${
                        activeFile === file.name ? 'bg-gray-700' : 'hover:bg-gray-800'
                      }`}
                    >
                      <File className="inline-block mr-2" /> {file.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-3/4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Terminal className="mr-2" />
                <span>{activeFile}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeFile}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm overflow-x-auto"
                >
                  <code>{fileContents[activeFile]}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8"
        >
          <ChevronRight className="mx-auto animate-pulse" />
          <p className="text-sm text-green-600">Select a file to view content</p>
        </motion.div>
      </main>
    </div>
  )
}