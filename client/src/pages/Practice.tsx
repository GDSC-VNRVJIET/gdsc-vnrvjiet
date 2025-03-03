// client/src/pages/Practice.tsx
import React, { useState, useEffect } from "react";

interface Question {
  question: string;
  platform: string;
  link: string;
}

interface Company {
  name: string;
  questions: Question[];
}

const practiceData: Company[] = [
  {
    name: "Google",
    questions: [
      {
        question: "Two Sum",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/two-sum/",
      },
      {
        question: "Minimum Swaps 2",
        platform: "HackerRank",
        link: "https://www.hackerrank.com/challenges/minimum-swaps-2/problem",
      },
      {
        question: "Factorial",
        platform: "CodeChef",
        link: "https://www.codechef.com/problems/FCTRL",
      },
      {
        question: "Sum of Two Numbers",
        platform: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/write-a-c-program-to-add-two-numbers/",
      },
      {
        question: "Binary Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/binary-search/",
      },
      {
        question: "Graph Traversal",
        platform: "HackerRank",
        link: "https://www.hackerrank.com/challenges/graph-traversal/problem",
      },
      {
        question: "Prime Checker",
        platform: "CodeChef",
        link: "https://www.codechef.com/problems/PRIME1",
      },
      {
        question: "Array Rotation",
        platform: "CodeForces",
        link: "https://codeforces.com/problemset/problem/149/A",
      },
      {
        question: "Longest Increasing Subsequence",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/longest-increasing-subsequence/",
      },
      {
        question: "Balanced Brackets",
        platform: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/",
      },
    ],
  },
  {
    name: "Amazon",
    questions: [
      {
        question: "Longest Substring Without Repeating Characters",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      },
      {
        question: "Sherlock and Anagrams",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem",
      },
      {
        question: "Chef and Strings",
        platform: "CodeChef",
        link: "https://www.codechef.com/problems/TWOSTR",
      },
      {
        question: "Knapsack Problem",
        platform: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
      },
      {
        question: "LRU Cache",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/lru-cache/",
      },
      {
        question: "Binary Tree Inorder Traversal",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/tree-inorder-traversal/problem",
      },
      {
        question: "Sorting Challenge",
        platform: "CodeForces",
        link: "https://codeforces.com/problemset/problem/405/A",
      },
      {
        question: "String Permutations",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/permutations/",
      },
      {
        question: "Edit Distance",
        platform: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/edit-distance-dp-5/",
      },
      {
        question: "Array Manipulation",
        platform: "HackerRank",
        link: "https://www.hackerrank.com/challenges/crush/problem",
      },
    ],
  },
  {
    name: "Microsoft",
    questions: [
      {
        question: "Reverse Linked List",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/reverse-a-linked-list/problem",
      },
      {
        question: "Clone Graph",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/clone-graph/",
      },
      {
        question: "Validate Binary Search Tree",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/validate-binary-search-tree/",
      },
      {
        question: "Path Sum",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/path-sum/",
      },
      {
        question: "Graph Connectivity",
        platform: "CodeForces",
        link: "https://codeforces.com/problemset/problem/469/A",
      },
      {
        question: "Subarray Sum",
        platform: "HackerRank",
        link: "https://www.hackerrank.com/challenges/subarray-sum/problem",
      },
      {
        question: "Power of Two",
        platform: "CodeChef",
        link: "https://www.codechef.com/problems/COBI20A",
      },
      {
        question: "Matrix Multiplication",
        platform: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/matrix-multiplication/",
      },
      {
        question: "Minimum Spanning Tree",
        platform: "HackerRank",
        link: "https://www.hackerrank.com/challenges/primsmstsub/problem",
      },
      {
        question: "Longest Palindromic Substring",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/longest-palindromic-substring/",
      },
    ],
  },
  {
    name: "Facebook",
    questions: [
      {
        question: "Number of Islands",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/number-of-islands/problem",
      },
      {
        question: "Valid Palindrome",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/valid-palindrome/",
      },
      {
        question: "Best Time to Buy and Sell Stock",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      },
      {
        question: "Postfix Evaluation",
        platform: "CodeChef",
        link: "https://www.codechef.com/problems/POSTFIX",
      },
      {
        question: "Expression Tree",
        platform: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/expression-tree/",
      },
      {
        question: "Connected Components",
        platform: "CodeForces",
        link: "https://codeforces.com/problemset/problem/701/A",
      },
      {
        question: "Inorder Traversal",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/tree-inorder-traversal/problem",
      },
      {
        question: "Subsequence Pattern Matching",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/is-subsequence/",
      },
      {
        question: "Cycle Detection",
        platform: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/",
      },
      {
        question: "Anagram Check",
        platform: "CodeChef",
        link: "https://www.codechef.com/problems/ANAGRAMS",
      },
    ],
  },
  {
    name: "Apple",
    questions: [
      {
        question: "Find Peak Element",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/find-peak-element/",
      },
      {
        question: "Search in Rotated Sorted Array",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      },
      {
        question: "Find Minimum in Rotated Sorted Array",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      },
      {
        question: "Spiral Matrix",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/spiral-matrix/",
      },
      {
        question: "Rotate Image",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/rotate-image/",
      },
      {
        question: "Set Matrix Zeroes",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/set-matrix-zeroes/",
      },
      {
        question: "Word Search",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/word-search/",
      },
      {
        question: "Combination Sum",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/combination-sum/",
      },
      {
        question: "Permutations",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/permutations/",
      },
      {
        question: "Sudoku Solver",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/sudoku-solver/problem",
      },
    ],
  },
  {
    name: "Netflix",
    questions: [
      {
        question: "Longest Increasing Subsequence",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/longest-increasing-subsequence/",
      },
      {
        question: "Edit Distance",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/edit-distance/",
      },
      {
        question: "Regular Expression Matching",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/regular-expression-matching/",
      },
      {
        question: "Wildcard Matching",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/wildcard-matching/",
      },
      {
        question: "Decode Ways",
        platform: "GeeksforGeeks",
        link:
          "https://www.geeksforgeeks.org/total-number-of-ways-to-decode-a-message/",
      },
      {
        question: "Unique Paths",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/unique-paths/",
      },
      {
        question: "Climbing Stairs",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/climbing-stairs/",
      },
      {
        question: "Minimum Path Sum",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/minimum-path-sum/",
      },
      {
        question: "Distinct Subsequences",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/distinct-subsequences/",
      },
      {
        question: "Interleaving String",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/interleaving-string/",
      },
    ],
  },
  {
    name: "Uber",
    questions: [
      {
        question: "Valid Parentheses",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/parentheses/problem",
      },
      {
        question: "Remove Invalid Parentheses",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/remove-invalid-parentheses/",
      },
      {
        question: "Longest Valid Parentheses",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/longest-valid-parentheses/",
      },
      {
        question: "Generate Parentheses",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/generate-parentheses/",
      },
      {
        question: "Merge Intervals",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/merge-intervals/",
      },
      {
        question: "Insert Interval",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/insert-interval/",
      },
      {
        question: "Interval List Intersections",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/interval-list-intersections/",
      },
      {
        question: "Non-overlapping Intervals",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/non-overlapping-intervals/",
      },
      {
        question: "Meeting Rooms II",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/meeting-rooms-ii/",
      },
      {
        question: "Meeting Rooms",
        platform: "LeetCode",
        link:
          "https://leetcode.com/problems/meeting-rooms/",
      },
    ],
  },
  {
    name: "Adobe",
    questions: [
      {
        question: "Dynamic Programming - Knapsack",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/coin-change/",
      },
      {
        question: "Tree Traversal",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/tree-preorder-traversal/problem",
      },
      {
        question: "Prime Factorization",
        platform: "CodeChef",
        link: "https://www.codechef.com/problems/PRIME1",
      },
      {
        question: "Graph Cycle Detection",
        platform: "GeeksforGeeks",
        link: "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/",
      },
      {
        question: "Sorting Algorithms",
        platform: "CodeForces",
        link: "https://codeforces.com/problemset/problem/25/A",
      },
      {
        question: "Longest Common Subsequence",
        platform: "LeetCode",
        link: "https://leetcode.com/problems/longest-common-subsequence/",
      },
      {
        question: "Binary Search Tree Operations",
        platform: "HackerRank",
        link:
          "https://www.hackerrank.com/challenges/binary-search-tree-insertion/problem",
      },
      {
        question: "Matrix Chain Multiplication",
        platform: "GeeksforGeeks",
        link:
          "https://www.geeksforgeeks.org/matrix-chain-multiplication-dp-8/",
      },
      {
        question: "Expression Evaluation",
        platform: "CodeChef",
        link: "https://www.codechef.com/problems/EXPR",
      },
      {
        question: "String Matching",
        platform: "CodeForces",
        link: "https://codeforces.com/problemset/problem/165/A",
      },
    ],
  },
];

const platformLogos: { [key: string]: string } = {
  LeetCode:
    "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
  HackerRank:
    "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
  CodeChef:
    "https://img.icons8.com/?size=100&id=O4SEeX66BY8o&format=png&color=000000",
  CodeForces:
    "https://img.icons8.com/?size=100&id=jldAN67IAsrW&format=png&color=000000",
  GeeksforGeeks:
    "https://img.icons8.com/?size=100&id=AbQBhN9v62Ob&format=png&color=000000",
};

const companyLogos: { [key: string]: string } = {
  Google:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  Amazon:
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  Microsoft:
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  Facebook:
    "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
  Apple:
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  Netflix:
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  Uber:
    "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
  Adobe:
    "https://img.icons8.com/?size=100&id=PKQUMGZF1SKL&format=png&color=000000",
};

const Practice: React.FC = () => {
  const [completed, setCompleted] = useState<{ [key: string]: boolean }>(() => {
    if (typeof window !== "undefined") {
      const storedProgress = localStorage.getItem("practiceProgress");
      return storedProgress ? JSON.parse(storedProgress) : {};
    }
    return {};
  });

  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    localStorage.setItem("practiceProgress", JSON.stringify(completed));
  }, [completed]);

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCheckboxChange = (companyIndex: number, questionIndex: number) => {
    const key = `${companyIndex}-${questionIndex}`;
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Practice - Placement PYQs</h1>
      {practiceData.map((company, compIndex) => {
        const total = company.questions.length;
        const completedCount = company.questions.reduce((acc, _, qIndex) => {
          const key = `${compIndex}-${qIndex}`;
          return acc + (completed[key] ? 1 : 0);
        }, 0);
        const progressPercentage = Math.round((completedCount / total) * 100);

        return (
          <div
            key={compIndex}
            className="mb-6 border rounded shadow p-4 transition-all duration-300 hover:shadow-xl"
          >
            <div
              onClick={() => toggleExpanded(compIndex)}
              className="cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center">
                <img
                  src={companyLogos[company.name] || ""}
                  alt={company.name}
                  className="w-8 h-8 object-contain mr-2"
                />
                <h2 className="text-2xl font-semibold">{company.name}</h2>
              </div>
              <span className="text-3xl">{expanded[compIndex] ? "−" : "+"}</span>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {completedCount} / {total} Completed ({progressPercentage}%)
              </p>
            </div>
            {expanded[compIndex] && (
              <ul className="mt-4 space-y-2 transition-all duration-300">
                {company.questions.map((q, qIndex) => {
                  const key = `${compIndex}-${qIndex}`;
                  return (
                    <li
                      key={qIndex}
                      className="flex items-center p-2 bg-white rounded shadow hover:shadow-md hover:bg-gray-100 transition"
                    >
                      <input
                        type="checkbox"
                        checked={!!completed[key]}
                        onChange={() => handleCheckboxChange(compIndex, qIndex)}
                        className="mr-2 w-6 h-6 transition-transform duration-200 ease-in-out active:scale-95"
                      />
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-gray-900"
                      >
                        <span className="font-medium">{q.question}</span>
                      </a>
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={platformLogos[q.platform] || ""}
                          alt={q.platform}
                          className="w-6 h-6 object-contain"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Practice;
