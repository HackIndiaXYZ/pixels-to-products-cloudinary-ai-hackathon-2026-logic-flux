// Client-side master fallback data for EchoLens AI
export const INITIAL_DEMO_DATA = {
  source: {
    title: "The Future of AI and Digital Media",
    filename: "the_future_of_ai_and_digital_media.mp4",
    cloudinary_url: "https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/docs/walking_talking.mp4",
    public_id: "docs/walking_talking",
    duration: 768.0,
    duration_formatted: "12:48",
    file_type: "video/mp4",
    file_size_mb: "42.8 MB",
    cloud_name: "demo",
    poster_url: "https://res.cloudinary.com/demo/video/upload/so_2,c_fill,w_640,h_360/docs/walking_talking.jpg"
  },
  summary: `The 2026 media landscape is shifting from manual content curation to automated, verifiable multimodal transformation. While generative AI reduces repetitive production by up to 73%, unverified hallucinations pose severe credibility risks. 

EchoLens AI solves this dilemma through a dual-core architecture: Audience Lens (which personalizes long-form multimedia into specialized formats for Students, Creators, Enterprises, and Journalists) and TruthTrace (which anchors every generated assertion to precise source audio-visual milliseconds). Powered by Cloudinary's edge media transformations, derived video shorts and audience artifacts are generated dynamically at scale.`,
  topics: [
    { id: "t1", name: "Generative Multimedia Production", category: "Technology", relevance: 98, description: "Automating video, audio, and text repackaging using multimodal AI pipelines." },
    { id: "t2", name: "TruthTrace Verification", category: "Security & Trust", relevance: 99, description: "Cryptographically and temporally anchoring AI claims to exact video milliseconds." },
    { id: "t3", name: "Audience Segmentation", category: "User Experience", relevance: 94, description: "Diverging a single master asset into customized cognitive formats." },
    { id: "t4", name: "Cloudinary Edge Transformations", category: "Infrastructure", relevance: 96, description: "Dynamic aspect-ratio reframing, intelligent gravity cropping, and instant video clipping." },
    { id: "t5", name: "Multilingual Accessibility", category: "Global Reach", relevance: 89, description: "Contextual vernacular translation across Hindi, Marathi, Tamil, and Telugu." }
  ],
  people: [
    { name: "Dr. Elena Rostova", role: "Chief AI Researcher, MediaSynth Labs", contribution: "Led research on TruthTrace acoustic timestamp anchoring.", timestamp_seconds: 270, timestamp_formatted: "04:30" },
    { name: "Marcus Chen", role: "VP of Product, CloudScale Media", contribution: "Demonstrated Cloudinary automated 9:16 aspect ratio reframing.", timestamp_seconds: 520, timestamp_formatted: "08:40" },
    { name: "Sarah Lin", role: "Investigative Tech Journalist", contribution: "Advocated for algorithmic accountability and timestamp standards.", timestamp_seconds: 640, timestamp_formatted: "10:40" }
  ],
  events: [
    { title: "Synthetic Media Bottleneck Keynote", timestamp_seconds: 15, timestamp_formatted: "00:15", description: "Introduction to manual curation bottlenecks." },
    { title: "73% Production Benchmark Release", timestamp_seconds: 84, timestamp_formatted: "01:24", description: "Empirical verification across 200 production workflows." },
    { title: "TruthTrace Architecture Unveiling", timestamp_seconds: 222, timestamp_formatted: "03:42", description: "Technical unveiling of millisecond grounding." },
    { title: "10M Viewer Retention Trial", timestamp_seconds: 310, timestamp_formatted: "05:10", description: "Empirical 3.2x retention increase through audience lenses." },
    { title: "Cloudinary CDN Edge Shorts Demo", timestamp_seconds: 455, timestamp_formatted: "07:35", description: "Live demonstration of dynamic short creation." },
    { title: "Regulatory Provenance Forecast", timestamp_seconds: 675, timestamp_formatted: "11:15", description: "Discussion on potential 2028 broadcast mandates." }
  ],
  claims: [
    {
      id: "claim-1",
      text: "AI can reduce repetitive content-production work by up to 73%.",
      timestamp_seconds: 84,
      timestamp_formatted: "01:24",
      confidence: 98,
      status: "Source-backed",
      evidence_quote: "In our benchmark testing across 200 production workflows, generative AI pipelines reduced repetitive timeline editing and content repackaging work by up to 73%.",
      category: "Productivity",
      verified: true
    },
    {
      id: "claim-2",
      text: "The TruthTrace mechanism anchors each synthesized statement to verified audio-visual milliseconds.",
      timestamp_seconds: 222,
      timestamp_formatted: "03:42",
      confidence: 96,
      status: "Source-backed",
      evidence_quote: "By anchoring each synthesized statement directly to verified audio-visual milliseconds and acoustic timestamps, every claim remains permanently tethered to its ground truth.",
      category: "Verification",
      verified: true
    },
    {
      id: "claim-3",
      text: "Audience-specific segmentation increases downstream retention and comprehension by over 3.2x compared to generic summaries.",
      timestamp_seconds: 310,
      timestamp_formatted: "05:10",
      confidence: 94,
      status: "Source-backed",
      evidence_quote: "In our controlled trial of 10 million viewers, audience-specific segmentation increased downstream retention and comprehension by over 3.2 times compared to generic summaries.",
      category: "Audience Engagement",
      verified: true
    },
    {
      id: "claim-4",
      text: "Cloudinary video transformations execute automated aspect-ratio reframing and short clipping within milliseconds at CDN edge.",
      timestamp_seconds: 455,
      timestamp_formatted: "07:35",
      confidence: 97,
      status: "Source-backed",
      evidence_quote: "Leveraging Cloudinary's dynamic video transformation engine, we execute automated aspect-ratio reframing and clip derivations within milliseconds directly at the CDN edge.",
      category: "Cloudinary Infrastructure",
      verified: true
    },
    {
      id: "claim-5",
      text: "Vernacular translation across Indic languages requires preserving conversational tone and context rather than literal word substitution.",
      timestamp_seconds: 590,
      timestamp_formatted: "09:50",
      confidence: 89,
      status: "Source-backed",
      evidence_quote: "In our tests across Hindi, Marathi, Tamil, and Telugu, retaining conversational tone and context was vital.",
      category: "Localization",
      verified: true
    },
    {
      id: "claim-6",
      text: "Decentralized cryptographic provenance will become mandatory for syndicated broadcast journalism by 2028.",
      timestamp_seconds: 675,
      timestamp_formatted: "11:15",
      confidence: 64,
      status: "Needs verification",
      evidence_quote: "While some industry panels forecast decentralized cryptographic provenance becoming mandatory for broadcast media by 2028, regulatory consensus is still evolving.",
      category: "Future Forecast",
      verified: false
    }
  ],
  story_graph: {
    center: { id: "root", label: "Future of AI & Digital Media", type: "root", category: "Core Thesis", color: "#10B981" },
    nodes: [
      { id: "n_truth", label: "TruthTrace Verification", type: "technology", category: "Core Tech", timestamp: "03:42", timestamp_seconds: 222, details: "Millisecond-level timestamp anchoring preventing hallucinations." },
      { id: "n_audience", label: "Audience Lens Engine", type: "framework", category: "UX Framework", timestamp: "05:10", timestamp_seconds: 310, details: "Personalizes content for Students, Creators, Business, and Journalists." },
      { id: "n_cloudinary", label: "Cloudinary Edge Pipeline", type: "infrastructure", category: "Cloudinary Media", timestamp: "07:35", timestamp_seconds: 455, details: "Smart gravity cropping, instant dynamic clipping, and global CDN delivery." },
      { id: "n_elena", label: "Dr. Elena Rostova", type: "person", category: "Researcher", timestamp: "04:30", timestamp_seconds: 270, details: "Pioneered multimodal acoustic grounding at MediaSynth Labs." },
      { id: "n_marcus", label: "Marcus Chen", type: "person", category: "Industry Expert", timestamp: "08:40", timestamp_seconds: 520, details: "Demonstrated CloudScale Media 9:16 vertical transformations." },
      { id: "n_claim73", label: "73% Workflow Reduction", type: "claim", category: "Metric Claim", timestamp: "01:24", timestamp_seconds: 84, details: "Benchmark across 200 production workflows." },
      { id: "n_claim32", label: "3.2x Retention Surge", type: "claim", category: "Metric Claim", timestamp: "05:10", timestamp_seconds: 310, details: "Controlled study of 10M viewers receiving audience-specific lenses." },
      { id: "n_prov", label: "2028 Broadcast Provenance", type: "forecast", category: "Needs Verification", timestamp: "11:15", timestamp_seconds: 675, details: "Potential regulatory timeline under active industry debate." }
    ],
    edges: [
      { from: "root", to: "n_truth", label: "safeguarded by" },
      { from: "root", to: "n_audience", label: "delivered through" },
      { from: "root", to: "n_cloudinary", label: "powered by" },
      { from: "n_truth", to: "n_elena", label: "researched by" },
      { from: "n_cloudinary", to: "n_marcus", label: "architected with" },
      { from: "root", to: "n_claim73", label: "evidenced by [01:24]" },
      { from: "n_audience", to: "n_claim32", label: "validated by [05:10]" },
      { from: "n_truth", to: "n_prov", label: "projects timeline [11:15]" }
    ]
  },
  audiences: {
    student: {
      lens_title: "Student & Academic Study Lens",
      tagline: "Master core concepts, retain critical formulas, and practice with instant interactive quizzes.",
      simple_explanation: "Imagine you have a 1-hour lecture. Instead of re-watching the whole thing, EchoLens breaks it into bite-sized concepts. Whenever you see a fact, you can click its timestamp to see the professor say it directly!",
      study_notes: [
        { topic: "1. The Synthetic Bottleneck", point: "Human content curation takes hours per video asset, leading to distribution delays.", source_timestamp: "00:45" },
        { topic: "2. Production Acceleration Metric", point: "AI pipelines decrease manual timeline editing by up to 73% (Benchmark: 200 studios).", source_timestamp: "01:24" },
        { topic: "3. Grounded Verification (TruthTrace)", point: "Anchors generated tokens to millisecond acoustic spectrograms to eliminate hallucinations.", source_timestamp: "03:42" },
        { topic: "4. Cognitive Divergence Law", point: "Audience-tailored formatting boosts viewer comprehension and retention by 3.2x.", source_timestamp: "05:10" }
      ],
      key_concepts: [
        { term: "TruthTrace", definition: "A verification mechanism tying synthesized statements to precise media timestamps." },
        { term: "Audience Lens", definition: "Cognitive transformation pipeline adapting one master asset for diverse persona needs." },
        { term: "Dynamic Edge Reframe", definition: "Cloudinary CDN-level intelligent cropping (9:16) using facial and action detection." },
        { term: "Spectrogram Anchoring", definition: "Mapping text tokens to audio frequencies to prove acoustic provenance." }
      ],
      quiz: [
        {
          id: "q1",
          question: "By what percentage does AI reduce repetitive video production according to the 200-workflow benchmark?",
          options: ["45%", "58%", "73%", "90%"],
          correct_index: 2,
          explanation: "At 01:24, the keynote states that generative AI reduced repetitive editing work by up to 73%.",
          source_timestamp: "01:24"
        },
        {
          id: "q2",
          question: "What is the primary function of TruthTrace?",
          options: [
            "To generate faster thumbnail images",
            "To anchor AI claims to verified source timestamps",
            "To translate audio into 50 languages",
            "To compress video files for mobile devices"
          ],
          correct_index: 1,
          explanation: "At 03:42, TruthTrace is introduced as a mechanism that links every synthesized statement to verified audio-visual milliseconds.",
          source_timestamp: "03:42"
        },
        {
          id: "q3",
          question: "In the 10 million viewer trial, audience-specific segmentation increased retention by how much?",
          options: ["1.5x", "2.1x", "3.2x", "4.8x"],
          correct_index: 2,
          explanation: "At 05:10, the trial showed retention and comprehension surged by over 3.2x.",
          source_timestamp: "05:10"
        },
        {
          id: "q4",
          question: "Which claim has a 'Needs Verification' status due to evolving regulatory consensus?",
          options: [
            "73% production reduction",
            "3.2x retention increase",
            "Mandatory 2028 cryptographic broadcast provenance",
            "Cloudinary dynamic aspect-ratio reframing"
          ],
          correct_index: 2,
          explanation: "At 11:15, the speaker notes that the 2028 provenance mandate is forecasted by some panels, but regulatory consensus is still evolving.",
          source_timestamp: "11:15"
        }
      ],
      revision_points: [
        "⚡ 73% production reduction verified at [01:24].",
        "⚡ TruthTrace connects claims to millisecond timestamps [03:42].",
        "⚡ 3.2x retention boost through audience segmentation [05:10].",
        "⚡ Cloudinary CDN handles edge reframing & shorts [07:35].",
        "⚡ 2028 regulatory timeline is speculative [11:15]."
      ]
    },
    creator: {
      lens_title: "Content Creator & Growth Lens",
      tagline: "Turn 1 long-form video into high-converting hooks, vertical reels scripts, and viral social threads.",
      short_video_hooks: [
        { hook: "🔥 'If you're still spending 4 hours editing a single podcast, you're doing it completely wrong.'", style: "High Pattern-Interrupt", target_platform: "TikTok / Instagram Reels", source_timestamp: "01:24" },
        { hook: "🚨 'Stop trusting AI summaries that don't cite their sources. Here is what's replacing them.'", style: "Curiosity & Urgency", target_platform: "YouTube Shorts", source_timestamp: "03:42" },
        { hook: "📈 'The 3.2x retention trick big media companies are keeping secret.'", style: "Insider Knowledge", target_platform: "LinkedIn Video / Reels", source_timestamp: "05:10" }
      ],
      short_form_script: {
        title: "The 73% AI Editing Cheat Code",
        duration: "45 seconds",
        aspect_ratio: "9:16 Vertical",
        sections: [
          { time: "00:00 - 00:05", visual: "[Quick zoom into speaker holding phone] Bold caption: '73% LESS WORK'", voiceover: "Did you know 200 studios just proved AI cuts editing time by 73%?" },
          { time: "00:05 - 00:18", visual: "[Screen recording of Cloudinary dynamic reframe from 16:9 to 9:16]", voiceover: "Instead of manually adjusting aspect ratios, Cloudinary's AI crops and tracks your face at CDN edge in milliseconds." },
          { time: "00:18 - 00:32", visual: "[Split screen showing TruthTrace clickable timestamp jumping to exact speech]", voiceover: "And the best part? No fake hallucinations. Every claim has a TruthTrace button that jumps straight to the raw clip." },
          { time: "00:32 - 00:45", visual: "[Call to action card with EchoLens AI logo]", voiceover: "Comment 'TRACE' and I'll send you the full breakdown of how to turn one podcast into 10 viral clips!" }
        ]
      },
      social_posts: {
        twitter_thread: [
          "1/5 🧵 73% of video editing is repetitive busywork. A 2026 benchmark of 200 studios just dropped, and the findings will change how you publish content forever:",
          "2/5 The biggest barrier isn't AI speed—it's trust. Generic summarizers hallucinate claims you can't verify. That's why TruthTrace is a game changer: every bullet point links to the exact second in the video.",
          "3/5 What about reach? Delivering one summary failed. Personalizing the content (Student vs Creator vs Business) increased retention by 3.2x across 10M viewers.",
          "4/5 Plus, with Cloudinary edge transformations, you can generate 9:16 reels dynamically by changing simple URL tags (`so_84,eo_120,ar_9:16,g_auto`).",
          "5/5 One source video. Infinite traceable experiences. Try EchoLens AI to see it live."
        ],
        linkedin_post: `Most content teams spend 80% of their bandwidth repackaging existing assets.

According to new benchmark data from 200 production workflows:
• Repetitive timeline editing dropped by 73%
• Tailored audience segmentation drove a 3.2x surge in downstream engagement
• Edge video transformations eliminated manual multi-format rendering

The future belongs to verifiable media pipelines where every generated insight can be audited in one click back to its source timestamp.`,
        instagram_carousel: [
          "Slide 1: Why 73% of Video Editing Is About To Disappear",
          "Slide 2: The Hallucination Problem (Why generic summaries fail)",
          "Slide 3: Meet TruthTrace: Don't just trust the AI, trace it",
          "Slide 4: The 3.2x Retention Secret: Audience-tailored lenses",
          "Slide 5: Automated 9:16 Vertical Cropping with Cloudinary",
          "Slide 6: Save this post to upgrade your content workflow"
        ]
      },
      content_ideas: [
        "Podcast episode breakdown into 5 standalone reels",
        "Interactive quiz story series on Instagram with source timestamp reveals",
        "Behind-the-scenes comparison of Cloudinary edge reframing vs manual cuts",
        "Live fact-checking stream using TruthTrace timestamp jump",
        "Multilingual repost strategy using verified vernacular clips"
      ]
    },
    business: {
      lens_title: "Enterprise & Executive Strategy Lens",
      tagline: "Bottom-line ROI metrics, market opportunities, and strategic 90-day implementation roadmaps.",
      executive_summary: "Multimedia production represents a high-cost operational bottleneck. Implementing multimodal AI asset repurposing paired with Cloudinary CDN transformations reduces timeline production costs by 73% while elevating audience retention by 3.2x. Crucially, the TruthTrace protocol provides enterprise-grade compliance and provenance, mitigating legal and reputational risks associated with AI hallucination.",
      key_insights: [
        { metric: "73% Cost/Time Reduction", description: "Standardized benchmark across 200 studios validates dramatic reduction in manual video slicing and captioning overhead.", source_timestamp: "01:24" },
        { metric: "3.2x Engagement Multiplier", description: "Segmenting corporate webinars into persona-specific deliverables yields 3.2x higher executive and customer retention.", source_timestamp: "05:10" },
        { metric: "Real-time Edge Efficiency", description: "Cloudinary dynamic URL transformations eliminate compute-heavy server-side rendering pipelines.", source_timestamp: "07:35" },
        { metric: "Audit & Compliance Defense", description: "TruthTrace timestamp hashes protect brand integrity against generative inaccuracies.", source_timestamp: "03:42" }
      ],
      opportunities: [
        "Enterprise Knowledge Repurposing: Convert all internal town halls and sales calls into executive briefs and client-facing summaries.",
        "Dynamic Omnichannel Delivery: Programmatically derive vertical social shorts and landscape webinars without duplicate storage overhead.",
        "Risk-Free AI Deployment: Adopt source-grounded TruthTrace to satisfy legal and regulatory compliance teams.",
        "Global Vernacular Expansion: Scale training across regional markets with high-context Indic translation."
      ],
      action_points: [
        { phase: "Immediate (Days 1 - 30)", action: "Audit current video asset repository; integrate Cloudinary CDN for automated URL-based cropping and delivery." },
        { phase: "Medium-Term (Days 31 - 60)", action: "Deploy EchoLens AI across marketing and internal training to automate Audience Lens derivation." },
        { phase: "Long-Term (Days 61 - 90)", action: "Mandate TruthTrace timestamp verification for all AI-generated public relations and executive communications." }
      ]
    },
    journalist: {
      lens_title: "Investigative Journalism & Fact-Checking Lens",
      tagline: "Rigorously audited claims, primary source quotes, entity credentials, and verification statuses.",
      neutral_summary: "At the 2026 Keynote on Synthetic Media, speakers presented findings from a 200-production workflow benchmark demonstrating up to 73% reductions in manual video editing time. To address widespread concerns regarding automated hallucinations, researchers introduced 'TruthTrace'—a protocol that binds AI claims to audio-visual timestamps. While audience segmentation claims are supported by a 10M viewer study, forward-looking statements regarding a mandatory 2028 broadcast provenance mandate remain speculative.",
      key_claims: [
        { claim: "AI reduces repetitive content-production work by up to 73%.", source: "01:24", status: "Verified / Source-Backed", notes: "Directly supported by 200-team production benchmark stated in keynote." },
        { claim: "Audience segmentation yields 3.2x retention increase.", source: "05:10", status: "Verified / Source-Backed", notes: "Corroborated by 10M viewer trial cited by Dr. Elena Rostova." },
        { claim: "Decentralized cryptographic provenance will become mandatory by 2028.", source: "11:15", status: "Unverified / Speculative", notes: "Speaker explicitly caveats that regulatory consensus is still evolving." }
      ],
      people_and_entities: [
        { entity: "Dr. Elena Rostova", title: "Chief AI Researcher, MediaSynth Labs", credibility: "Primary Researcher; authored cognitive divergence paper." },
        { entity: "Marcus Chen", title: "VP of Product, CloudScale Media", credibility: "Technical stakeholder on Cloudinary CDN transformation architecture." },
        { entity: "Sarah Lin", title: "Investigative Tech Journalist", credibility: "Independent observer on algorithmic transparency and verification." }
      ],
      evidence_breakdown: [
        "Raw acoustic frequency alignment verified between 03:42 and 04:10.",
        "Video demonstration of Cloudinary CDN transformation shown at 07:35.",
        "No formal legislative bill or regulatory citation provided for 2028 mandate."
      ]
    },
    general: {
      lens_title: "General Audience & Everyday Overview",
      tagline: "Clear, jargon-free summary of how AI is transforming video and why source-traceability matters to you.",
      simple_summary: "Video is everywhere, but turning long recordings into short clips and notes takes an enormous amount of work. New AI tools can do 73% of this work in seconds. The biggest breakthrough is EchoLens AI's 'TruthTrace' feature: whenever you read a summary, you can click a timestamp to see the speaker actually say it, ensuring you never get fooled by fake AI summaries.",
      key_takeaways: [
        "🎥 AI cuts repetitive video editing work by 73%.",
        "🔍 TruthTrace allows you to verify any AI summary against the original video in 1 click.",
        "👥 Content is adapted specifically for who you are: student, creator, or business professional.",
        "⚡ Cloudinary handles smart vertical video clips in milliseconds without slow rendering.",
        "🌐 Works smoothly across multiple languages with natural tone."
      ],
      why_it_matters: "In a world flooded with AI-generated misinformation, having a way to immediately check the source video gives you confidence that what you are learning and sharing is 100% genuine."
    }
  },
  shorts_presets: [
    {
      id: "short-1",
      title: "The 73% Productivity Metric",
      start_time: 75.0,
      end_time: 105.0,
      duration: 30.0,
      aspect_ratio: "9:16",
      caption: "How AI cuts video editing by 73% across 200 studios",
      badge: "Viral Benchmark"
    },
    {
      id: "short-2",
      title: "TruthTrace: Hallucination Killer",
      start_time: 210.0,
      end_time: 245.0,
      duration: 35.0,
      aspect_ratio: "9:16",
      caption: "Don't just trust the AI. Trace it to the millisecond.",
      badge: "Core Differentiator"
    },
    {
      id: "short-3",
      title: "Cloudinary CDN Edge Cropping",
      start_time: 445.0,
      end_time: 485.0,
      duration: 40.0,
      aspect_ratio: "9:16",
      caption: "Dynamic aspect-ratio reframing in milliseconds at the edge",
      badge: "Cloudinary Power"
    }
  ],
  translations: {
    hi: {
      language_name: "Hindi (हिंदी)",
      summary: "2026 मीडिया परिदृश्य में मल्टीमीडिया कंटेंट को दर्शकों के अनुसार बदलना अनिवार्य हो गया है। जहां जेनरेटिव एआई उत्पादन में 73% तक की बचत करता है, वहीं 'ट्रूथट्रेस' (TruthTrace) तकनीक प्रत्येक दावे को मूल वीडियो के सटीक समय (टाइमस्टैम्प) से जोड़ती है ताकि कोई भ्रम या फर्जी जानकारी न फैले।",
      takeaways: [
        "🎥 एआई वीडियो संपादन के दोहराव वाले काम को 73% तक कम करता है।",
        "🔍 ट्रूथट्रेस की मदद से आप 1 क्लिक में किसी भी एआई सारांश की मूल वीडियो से पुष्टि कर सकते हैं।",
        "👥 सामग्री को छात्र, निर्माता या व्यवसायी की आवश्यकतानुसार विशेष रूप से तैयार किया जाता है।",
        "⚡ क्लाउडिनरी (Cloudinary) कुछ ही पलों में स्मार्ट वर्टिकल वीडियो क्लिप्स तैयार करता है।"
      ]
    },
    mr: {
      language_name: "Marathi (मराठी)",
      summary: "मल्टिमीडिया सामग्रीचे विविध प्रेक्षक-विशिष्ट अनुभवांमध्ये रूपांतर करणे आता सोपे झाले आहे. जनरेटिव्ह एआय व्हिडिओ निर्मितीतील वेळ ७३% वाचवते. 'ट्रुथट्रेस' (TruthTrace) तंत्रज्ञानामुळे निर्माण केलेल्या प्रत्येक दाव्याचा मूळ व्हिडिओतील अचूक वेळेसह थेट पुरावा तपासता येतो.",
      takeaways: [
        "🎥 एआय व्हिडिओ संपादनातील ७३% वेळेची बचत करते.",
        "🔍 ट्रुथट्रेसद्वारे आपण एका क्लिकवर दाव्याची सत्यता पडताळू शकता.",
        "👥 विद्यार्थी, क्रिएटर आणि बिझनेससाठी वेगवेगळे विश्लेषण उपलब्ध.",
        "⚡ क्लाउडिनरीच्या सहाय्याने काही सेकंदांत व्हर्टिकल शॉर्ट्स तयार होतात."
      ]
    },
    ta: {
      language_name: "Tamil (தமிழ்)",
      summary: "2026 ஆம் ஆண்டின் ஊடக உலகில் மல்டிமீடியா உள்ளடக்கத்தை பார்வையாளர்களுக்கு ஏற்ப மாற்றுவது அவசியமாகிறது. உற்பத்தி நேரத்தை 73% குறைக்கும் அதே வேளையில், 'ட்ரூத் ட்ரேஸ்' (TruthTrace) தொழில்நுட்பம் உருவாக்கப்பட்ட ஒவ்வொரு கூற்றையும் மூல வீடியோ நேரத்துடன் இணைத்து உண்மையை உறுதிப்படுத்துகிறது.",
      takeaways: [
        "🎥 AI காணொளி எடிட்டிங் பணிகளை 73% வரை குறைக்கிறது.",
        "🔍 ட்ரூத் ட்ரேஸ் மூலம் ஒரே கிளிக்கில் மூல வீடியோ ஆதாரத்தை சரிபார்க்கலாம்.",
        "👥 மாணவர்கள், படைப்பாளிகள் மற்றும் வணிகத்திற்கான பிரத்யேக வடிவங்கள்.",
        "⚡ கிளவுடினரி (Cloudinary) மூலம் நொடிகளில் செங்குத்து ரீல்ஸ் உருவாக்கலாம்."
      ]
    },
    te: {
      language_name: "Telugu (తెలుగు)",
      summary: "మల్టీమీడియా కంటెంట్‌ను విభిన్న ప్రేక్షకుల అవసరాలకు అనుగుణంగా మార్చడం ఇప్పుడు మరింత సులభం. ఉత్పాదకతను 73% పెంచుతూనే, 'ట్రూత్‌ట్రేస్' (TruthTrace) టెక్నాలజీ ప్రతి ఏఐ ప్రకటనను అసలు వీడియో టైమ్‌స్టాంప్‌తో అనుసంధానించి ప్రామాణికతను నిరూపిస్తుంది.",
      takeaways: [
        "🎥 AI వీడియో ఎడిటింగ్ శ్రమను 73% తగ్గిస్తుంది.",
        "🔍 ట్రూత్‌ట్రేస్ ద్వారా ఒక్క క్లిక్‌తో వీడియో ఆధారాలను ధృవీకరించవచ్చు.",
        "👥 విద్యార్థులు, క్రియేటర్లు మరియు వ్యాపారవేత్తల కోసం ప్రత్యేక విభాగాలు.",
        "⚡ క్లౌడినరీ (Cloudinary) క్షణాల్లో వర్టికల్ షార్ట్ క్లిప్పులను సిద్ధం చేస్తుంది."
      ]
    }
  }
};
