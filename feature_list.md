# Speking - Feature List & Requirement Specification

> **Vision**: A high-fidelity, "Figma-quality" prototype for an All-In-One English Learning System. The UI/UX mimics actual exam environments (PTE/IELTS) while providing modern, premium gamification for daily practice.

## 1. Core Platform Features (The "Wow" Factor)
- **Glassmorphic Dashboard**:
  - Personalized greeting with day/night cycle visuals.
  - "Daily Goal" circular progress widgets (Vocabulary, Speaking, Time Spent).
  - Streak counter with fire animations.
- **Global Analytics**:
  - Radar Chart showing skill balance (Speaking, Writing, Reading, Listening).
  - Predicted Score AI calculation (e.g., "Current PTE Forecast: 65, IELTS Band: 7.0").
  - "Weakness Detector": AI highlights specific question types dragging down the score (e.g., "Weak in Describe Image").
- **Gamification & Social**:
  - **Live Global Leaderboard**: Real-time ranking updates (Daily/Weekly/All-time). Filter by Country or Friends.
  - **Badges & Achievements**: 50+ unique badges (e.g., "Early Bird", "Pronunciation Master", "7 Day Streak").
  - **XP & Level System**: Earn XP for every correct answer, leveling up the user profile frame.
- **Dark/Light Mode** Toggle (Smooth transition).
- **Personal Wishlist/Notebook**:
  - "My Glitch Words": Auto-saved list of words users failed to pronounce correctly.
  - "Star Questions": Save difficult questions for later review.

## 2. PTE Academic Module (Real Exam Simulation)
*High-Fidelity replication of the Pearson Test of English interface (Alfa Software / Official Guide Style).*
- **UI fidelity**:
  - Exact color hex codes from the real exam (Sterile Grey backgrounds, specific "Next" button placement).
  - "Exam Mode" toggle: Enforces full-screen, disables copy-paste (except where allowed), and removes all app navigation for immersion.
  - Timer logic: Distinct per-item times vs section timers exactly as per 2024 PTE standards.

### A. Speaking & Writing (Section 1)
- **Personal Introduction**: Unscored warmup recording interface.
- **Read Aloud**:
  - Text display with progress bar.
  - Microphone recording visualization (waveform).
  - AI Analysis: Oral Fluency, Pronunciation score (0-90).
- **Repeat Sentence**: audio playback only once, then recording trigger.
- **Describe Image**:
  - Gallery of complex graphs/charts (Line, Bar, Pie, Maps).
  - Countdown timer (25s prep, 40s rec).
- **Retell Lecture**: Audio/Video player + Note-taking scratchpad area.
- **Essay Writing**:
  - Word count tracker (200-300 words).
  - Cut/Copy/Paste buttons (PTE style limitations).
  - Timer: Strict 20 min countdown.

### B. Reading (Section 2)
- **Interface**: Split screen design (Text on left, Questions on right).
- **Fill in the Blanks (Drag & Drop)**: Smooth draggable pill UI.
- **Multiple Choice (Multiple Answers)**: Checkbox style with massive click areas.
- **Re-order Paragraphs**: Draggable text blocks with magnetic snapping.

### C. Listening (Section 3)
- **Summarize Spoken Text**: Audio player + Text box (50-70 words constraint).
- **Highlight Incorrect Words**: Dynamic text where clicking a word highlights it yellow.
- **Write from Dictation**: Audio plays once -> User types sentence.

## 3. IELTS Module (Computer-Delivered UI)
*Replicating the IDP/British Council CD-IELTS interface (Black/Yellow/White theme).*
- **CD-IELTS Specific UI**:
  - Top bar with "Time Remaining" (Red when < 5 mins).
  - Bottom bar with Question Palette (Square boxes, clickable).
  - "Help" and "Hide" buttons exactly positioned.
  - **Settings**: Customizable font size and color scheme (Standard, High Contrast) as present in real CD-IELTS.

- **IELTS Speaking Simulator**:
  - "Video Call" style interface with an AI Examiner avatar.
  - 3-Part test flow (Introduction, Cue Card, Discussion).
  - Real-time feedback overlay (transcription + grammar correction).
- **IELTS Reading & Listening**:
  - Highlight & Note-taking context menu (Right-click to highlight text).
  - Split-screen scrolling for reading passages.
- **IELTS Writing**:
  - Task 1 (Graph description) & Task 2 (Essay).
  - Word count validator and "Submit" confirmation flow.

## 4. General English & Speaking Coach (The "Level Up" System)
- **Gamified Speaking Journey (100 Levels)**:
  - **Progression Map**: A Candy-Crush style saga map with 100 locked levels.
  - **Unlock Mechanism**: Must score >80% stars in current level to unlock the next.
  - **Boss Levels**: Every 10 levels, a "Boss" challenge (e.g., Tongue Twister Speed Run).
  - **Content**: Teacher-curated questions ranging from "Basic Introduction" (Lvl 1) to "Complex Debate" (Lvl 100).
  
- **Scenario Practice & Roleplay**:
  - **Real-world Sims**: "Ordering Coffee", "Immigration Officer", "Job Interview".
  - AI Avatar acts as the conversation partner with voice response.
  
- **Scenario Practice & Roleplay**:
  - **Real-world Sims**: "Ordering Coffee", "Immigration Officer", "Job Interview".
  - AI Avatar acts as the conversation partner with voice response.

## 5. Super Admin & Teacher Command Center
*A powerful backend portal for institutes/teachers to control the entire ecosystem.*

### A. Content Management System (CMS)
- **Universal Question Builder**:
  - Create content for ANY of the 20+ question types (PTE/IELTS).
  - **Rich Text Editor**: Formatting for Reading passages.
  - **Audio Uploader**: Drag & drop support for Listening tasks.
- **Mock Test Composer**:
  - Drag-and-drop playlist builder to create custom "Full Mock Tests" or "Mini Mocks".
  - Set specific time limits and scoring rules for custom tests.

### B. Student Management (CRM)
- **The "Spyglass" View**:
  - View a student's screen in real-time (optional).
  - Deep-dive into specific test attempt history.
- **Assignment Dispatcher**:
  - "Push" specific question sets to a student's dashboard.
  - Set deadlines and view completion status.

### C. Institute Analytics
- **Live Class Monitor**: See who is currently online and what they are practicing.
- **Performance Heatmap**: accurate visual showing which question types the entire batch is failing at.

## 6. Mock Test & Practice Modes

- **AI Pronunciation Doctor**:
  - Phoneme-level breakdown (e.g., /th/ vs /d/).
  - Visual tongue-placement guides (3D diagrams).
- **Vocabulary Builder**:
  - Flash cards with spaced repetition.
  - "Word of the Day" with usage examples.
- **Scenario Practice**:
  - Roleplay mode (e.g., "At a Coffee Shop", "Job Interview").
  - Conversation bubbles UI.

## 5. Mock Test & Practice Modes
- **Full Mock Test**:
  - Strict full-length experience (2-3 hours).
  - No pause allowed.
  - Result generation at the end.
- **Sectional Mock**: Just Speaking or Just Reading.
- **Practice Mode**:
  - "Instant Check" button enabled.
  - Explanations shown immediately after answering.
