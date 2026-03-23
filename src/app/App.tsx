import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Circle, Music, Calendar, ExternalLink, Gift, ShoppingCart, Instagram, Youtube, ChevronDown, ChevronUp, Trophy, Video, Share2, Menu, X } from 'lucide-react';
import backgroundImage from './assets/bg-mazzel.jpg';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';

interface ServiceLink {
  name: string;
  icon: string;
  purchaseUrl: string;
  applicationUrl: string;
  color: string;
  buttonColor: string;
}

const services: ServiceLink[] = [
  { 
    name: 'iTunes', 
    icon: '🍎',
    purchaseUrl: 'https://music.apple.com/jp/album/get-up-and-dance/1882367769?i=1882367771', 
    applicationUrl: 'https://form.universal-music.co.jp/dl_mazzel_guad/page/form.html',
    color: 'from-pink-200/40 to-rose-200/40',
    buttonColor: 'from-pink-400/80 to-rose-400/80'
  },
  { 
    name: 'レコチョク', 
    icon: '🎵',
    purchaseUrl: 'https://recochoku.jp/song/S1030008029', 
    applicationUrl: 'https://form.universal-music.co.jp/dl_mazzel_guad/page/form.html',
    color: 'from-orange-200/40 to-red-200/40',
    buttonColor: 'from-orange-400/80 to-red-400/80'
  },
  { 
    name: 'mora', 
    icon: '🎧',
    purchaseUrl: 'https://mora.jp/package/43000006/00199957565196/', 
    applicationUrl: 'https://form.universal-music.co.jp/dl_mazzel_guad/page/form.html',
    color: 'from-blue-200/40 to-indigo-200/40',
    buttonColor: 'from-blue-400/80 to-indigo-400/80'
  },
  { 
    name: 'Amazon Music', 
    icon: '🛒',
    purchaseUrl: 'https://www.amazon.co.jp/dp/B0GS545C63?tag=universmusicc-22&ie=UTF8&linkCode=as2&ascsubtag=f2422228ae95033e9b024fc326579956&ref=dmm_acq_soc_jp_u_lfire_lp_x_f2422228ae95033e9b024fc326579956', 
    applicationUrl: 'https://form.universal-music.co.jp/dl_mazzel_guad/page/form.html',
    color: 'from-cyan-200/40 to-blue-200/40',
    buttonColor: 'from-cyan-400/80 to-blue-400/80'
  },
];

interface PurchaseChecklist {
  [key: string]: {
    purchased: boolean;
    campaigned: boolean;
  };
}

interface CampaignChecklist {
  downloadSteps: { [key: string]: boolean };
  videoSteps: { [key: string]: boolean };
  spotifyMembers: { [key: string]: boolean };
  spotifySteps: { [key: string]: boolean };
  chartAchievements: { [key: string]: boolean };
}

export default function App() {
  const [purchaseChecklist, setPurchaseChecklist] = useState<PurchaseChecklist>(() => {
    const saved = localStorage.getItem("mazzel-purchase-checklist");
    return saved ? JSON.parse(saved) : {};
  });

  const [campaignChecklist, setCampaignChecklist] = useState<CampaignChecklist>(() => {
    const saved = localStorage.getItem("mazzel-campaign-checklist");
    const defaultChecklist = {
      downloadSteps: {},
      videoSteps: {},
      spotifyMembers: {},
      spotifySteps: {},
      chartAchievements: {}
    };
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure chartAchievements exists for backward compatibility
      return {
        ...defaultChecklist,
        ...parsed,
        chartAchievements: parsed.chartAchievements || {}
      };
    }
    return defaultChecklist;
  });

  const [openScheduleDates, setOpenScheduleDates] = useState<{ [key: string]: boolean }>(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todayKey = `${month}/${day}`;
    return { [todayKey]: true };
  });

  const [openDownloadCampaign, setOpenDownloadCampaign] = useState(false);
  const [openChartHistory, setOpenChartHistory] = useState(true);
  const [openVideoCampaign, setOpenVideoCampaign] = useState(false);
  const [openSpotifyCampaign, setOpenSpotifyCampaign] = useState(false);
  const [openDigitalCampaign, setOpenDigitalCampaign] = useState(true);
  const [openSchedule, setOpenSchedule] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null);
  const campaignRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const downloadCampaignRef = useRef<HTMLDivElement>(null);
  const videoCampaignRef = useRef<HTMLDivElement>(null);
  const spotifyCampaignRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("mazzel-purchase-checklist", JSON.stringify(purchaseChecklist));
  }, [purchaseChecklist]);

  useEffect(() => {
    localStorage.setItem("mazzel-campaign-checklist", JSON.stringify(campaignChecklist));
  }, [campaignChecklist]);

  const togglePurchase = (serviceName: string) => {
    setPurchaseChecklist(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        purchased: !prev[serviceName]?.purchased
      }
    }));
  };

  const toggleCampaign = (serviceName: string) => {
    setPurchaseChecklist(prev => ({
      ...prev,
      [serviceName]: {
        ...prev[serviceName],
        campaigned: !prev[serviceName]?.campaigned
      }
    }));
  };

  const toggleVideoStep = (step: string) => {
    setCampaignChecklist(prev => ({
      ...prev,
      videoSteps: {
        ...prev.videoSteps,
        [step]: !prev.videoSteps[step]
      }
    }));
  };

  const toggleDownloadStep = (step: string) => {
    setCampaignChecklist(prev => ({
      ...prev,
      downloadSteps: {
        ...prev.downloadSteps,
        [step]: !prev.downloadSteps[step]
      }
    }));
  };

  const toggleChartAchievement = (chart: string) => {
    setCampaignChecklist(prev => ({
      ...prev,
      chartAchievements: {
        ...prev.chartAchievements,
        [chart]: !prev.chartAchievements[chart]
      }
    }));
  };

  const toggleSpotifyMember = (member: string) => {
    setCampaignChecklist(prev => ({
      ...prev,
      spotifyMembers: {
        ...prev.spotifyMembers,
        [member]: !prev.spotifyMembers[member]
      }
    }));
  };

  const toggleSpotifyStep = (step: string) => {
    setCampaignChecklist(prev => ({
      ...prev,
      spotifySteps: {
        ...prev.spotifySteps,
        [step]: !prev.spotifySteps[step]
      }
    }));
  };

  const toggleScheduleDate = (date: string) => {
    setOpenScheduleDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  interface ScheduleEvent {
    category?: string;
    title: string;
    time?: string;
    url?: string;
  }

  interface ScheduleDate {
    date: string;
    dayOfWeek: string;
    events: ScheduleEvent[];
  }

  const scheduleData: ScheduleDate[] = [
    {
      date: '3/22',
      dayOfWeek: 'Sun',
      events: [
        {
          time: '21:00',
          title: "'Get Up And Dance' Music Video Teaser"
        }
      ]
    },
    {
      date: '3/23',
      dayOfWeek: 'Mon',
      events: [
        {
          time: '0:00',
          title: "'Get Up And Dance' Digital Release"
        },
        {
          time: '20:30',
          title: "「Get Up And Dance」Music Video公開直前 -YouTube Live-"
        },
        {
          time: '21:00',
          title: '「Get Up And Dance」Music Video プレミア公開'
        },
        {
          category: 'MAGAZINE',
          title: '「S Cawaii!ME 2026 SPRING」',
          url: 'https://scawaiiweb.com/20260219_scawaiime_johoukaikin'
        },
        {
          category: 'MAGAZINE',
          title: '「SPRING」5月号増刊',
          url: 'https://tkj.jp/spring/'
        }
      ]
    },
    {
      date: '3/24',
      dayOfWeek: 'Tue',
      events: [
        {
          time: '19:30 - 20:00',
          title: 'Stationhead Listening Party'
        },
        {
          time: '24:15 - 24:44',
          category: 'TV',
          title: 'NHKBS「The Covers」(再編集版) - KAIRYU'
        }
      ]
    },
    {
      date: '3/25',
      dayOfWeek: 'Wed',
      events: [
        {
          time: '19:30 - 20:00',
          title: 'Stationhead Listening Party'
        }
      ]
    },
    {
      date: '3/26',
      dayOfWeek: 'Thu',
      events: [
        {
          time: '19:30 - 20:00',
          title: 'Stationhead Listening Party'
        }
      ]
    },
    {
      date: '3/27',
      dayOfWeek: 'Fri',
      events: [
        {
          time: '24:35 - 25:05',
          category: 'TV',
          title: '読売テレビ「音道楽♪」 - KAIRYU・RAN'
        },
        {
          time: '24:59 - 25:59',
          category: 'TV',
          title: '日本テレビ「バズリズム02」'
        }
      ]
    },
    {
      date: '3/28',
      dayOfWeek: 'Sat',
      events: [
        {
          time: '9:30 - 14:00',
          category: 'TV',
          title: 'TBS「王様のブランチ」 - KAIRYU・NAOYA'
        },
        {
          time: '22:00 - 23:30',
          category: 'RADIO',
          title: 'TALK ABOUT (TBSラジオ) - KAIRYU'
        }
      ]
    },
    {
      date: '3/30',
      dayOfWeek: 'Mon',
      events: [
        {
          time: '19:00 - 22:57',
          category: 'TV',
          title: 'CDTVライブ！ライブ！(TBS)'
        }
      ]
    },
    {
      date: '3/31',
      dayOfWeek: 'Tue',
      events: [
        {
          time: '19:10 - 21:35',
          category: 'TV',
          title: 'アオショー！エクステンデッド版（映画・チャンネルNECO) - RAN'
        }
      ]
    }
  ];

  const getDayColor = (dayOfWeek: string) => {
    const colorMap: { [key: string]: string } = {
      'Sun': 'bg-red-500',
      'Mon': 'bg-orange-500',
      'Tue': 'bg-yellow-500',
      'Wed': 'bg-green-500',
      'Thu': 'bg-blue-500',
      'Fri': 'bg-purple-500',
      'Sat': 'bg-pink-500'
    };
    return colorMap[dayOfWeek] || 'bg-orange-500';
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'TV': 'bg-red-600',
      'RADIO': 'bg-purple-600',
      'MAGAZINE': 'bg-teal-600'
    };
    return colorMap[category] || 'bg-rose-600'
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Background Image with slight blur */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(2px)',
          transform: 'scale(1.05)'
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-black/20"></div>

      {/* Floating Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 right-4 z-50 bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-full shadow-lg border border-white/30 transition-all"
        aria-label="Menu"
      >
        {menuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="fixed top-20 right-4 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-white/50 p-4 w-64 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-900 font-bold mb-3 text-lg">メニュー</h3>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto">
              {/* トップに戻る */}
              <button
                onClick={() => {
                  scrollToSection(headerRef);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-white/60 transition-colors text-left"
              >
                <Music className="w-5 h-5 text-purple-600" />
                <span className="text-gray-900 font-medium">トップに戻る</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-300 my-2"></div>

              {/* CHART */}
              <button
                onClick={() => {
                  scrollToSection(chartRef);
                  setOpenChartHistory(true);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-white/60 transition-colors text-left"
              >
                <Trophy className="w-5 h-5 text-orange-600" />
                <span className="text-gray-900 font-medium">CHART</span>
              </button>

              {/* デジタルキャンペーン - メインカテゴリ */}
              <div className="pl-0">
                <button
                  onClick={() => {
                    scrollToSection(campaignRef);
                    setOpenDigitalCampaign(true);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-white/60 transition-colors text-left"
                >
                  <Gift className="w-5 h-5 text-pink-600" />
                  <span className="text-gray-900 font-medium">デジタルキャンペーン</span>
                </button>
                
                {/* サブメニュー */}
                <div className="pl-8 mt-1 space-y-1">
                  <button
                    onClick={() => {
                      scrollToSection(campaignRef);
                      setOpenDigitalCampaign(true);
                      setOpenDownloadCampaign(true);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <ShoppingCart className="w-4 h-4 text-pink-500" />
                    <span className="text-gray-800 text-sm">ダウンロード</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection(campaignRef);
                      setOpenDigitalCampaign(true);
                      setOpenVideoCampaign(true);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <Video className="w-4 h-4 text-red-500" />
                    <span className="text-gray-800 text-sm">動画投稿</span>
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection(campaignRef);
                      setOpenDigitalCampaign(true);
                      setOpenSpotifyCampaign(true);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <Share2 className="w-4 h-4 text-green-500" />
                    <span className="text-gray-800 text-sm">Spotify Canvas</span>
                  </button>
                </div>
              </div>

              {/* スケジュール */}
              <button
                onClick={() => {
                  scrollToSection(scheduleRef);
                  setOpenSchedule(true);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-white/60 transition-colors text-left"
              >
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-gray-900 font-medium">スケジュール</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-300 my-2"></div>

              {/* SNSリンク */}
              <div className="pt-2">
                <p className="text-gray-700 font-semibold text-xs mb-2 px-3">公式SNS</p>
                <div className="space-y-1">
                  <a
                    href="https://twitter.com/mazzel_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-700">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                      </svg>
                    </div>
                    <span className="text-gray-800 text-sm">X (Twitter)</span>
                  </a>
                  <a
                    href="https://www.instagram.com/mazzel_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <Instagram className="w-4 h-4 text-gray-700" />
                    <span className="text-gray-800 text-sm">Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@MAZZEL_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <Youtube className="w-4 h-4 text-gray-700" />
                    <span className="text-gray-800 text-sm">YouTube</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@mazzelofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-700">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                    </div>
                    <span className="text-gray-800 text-sm">TikTok</span>
                  </a>
                </div>
              </div>

              {/* ストリーミングリンク */}
              <div className="pt-2">
                <p className="text-gray-700 font-semibold text-xs mb-2 px-3">ストリーミング</p>
                <div className="space-y-1">
                  <a
                    href="https://mazzel.lnk.to/GUAD?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnnP0lYKHgmLR2JFJYGb3waftlekwJsj9m0ioh9M38GtGDKSBcsfgk5DlsYJs_aem_woAGUuoaqF1z43zSScTVfQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <Music className="w-4 h-4 text-gray-700" />
                    <span className="text-gray-800 text-sm">全サービス</span>
                  </a>
                  <a
                    href="https://open.spotify.com/album/75zcHOYgdJAQvUpR2ySLQG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors text-left"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                    <span className="text-gray-800 text-sm">Spotify</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full mb-6 shadow-lg text-sm md:text-base border border-white/30">
            <Music className="w-4 h-4 md:w-5 md:h-5" />
            <span>非公式サイト</span>
          </div>
          
          <div className="mb-6">
            <h1 className="mb-2 text-white drop-shadow-lg text-3xl md:text-4xl font-bold">MAZZEL</h1>
            <p className="text-white/90 mb-2 text-xl md:text-2xl drop-shadow">'Get Up And Dance'</p>
            <p className="text-white/80 text-lg md:text-xl">2026.03.23 Digital Release</p>
          </div>

          {/* SNS Links */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
            <a
              href="https://twitter.com/mazzel_official"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all shadow-lg border border-white/30"
              aria-label="X"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="white" 
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/mazzel_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all shadow-lg border border-white/30"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </a>
            <a
              href="https://www.youtube.com/@MAZZEL_official"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all shadow-lg border border-white/30"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </a>
            <a
              href="https://www.tiktok.com/@mazzelofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all shadow-lg border border-white/30"
              aria-label="TikTok"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="white" 
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z\"/>
              </svg>
            </a>
            <a
              href="https://mazzel.lnk.to/GUAD?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnnP0lYKHgmLR2JFJYGb3waftlekwJsj9m0ioh9M38GtGDKSBcsfgk5DlsYJs_aem_woAGUuoaqF1z43zSScTVfQ"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all shadow-lg border border-white/30"
              aria-label="Streaming"
            >
              <Music className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </a>
          </div>
        </div>

        {/* Chart Section */}
        <div ref={chartRef} className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
          <button
            onClick={() => setOpenChartHistory(!openChartHistory)}
            className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <h2 className="text-white drop-shadow-lg text-lg md:text-xl">CHART</h2>
            </div>
            {openChartHistory ? 
              <ChevronUp className="w-5 h-5 text-white/70" /> : 
              <ChevronDown className="w-5 h-5 text-white/70" />
            }
          </button>
          
          {openChartHistory && (
            <>
              <div className="space-y-3">
                {/* mora */}
                <div className={`backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm transition-all ${
                  campaignChecklist.chartAchievements?.['mora'] 
                    ? 'bg-gradient-to-r from-amber-300/60 to-yellow-300/60' 
                    : 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={campaignChecklist.chartAchievements?.['mora'] || false}
                      onCheckedChange={() => toggleChartAchievement('mora')}
                      className="mt-1"
                    />
                    <div className="text-3xl md:text-4xl">👑</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">mora</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm">都道府県別DLランキング 全国制覇</p>
                    </div>
                  </div>
                </div>

                {/* YouTube */}
                <div className={`backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm transition-all ${
                  campaignChecklist.chartAchievements?.['youtube'] 
                    ? 'bg-gradient-to-r from-red-300/60 to-pink-300/60' 
                    : 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={campaignChecklist.chartAchievements?.['youtube'] || false}
                      onCheckedChange={() => toggleChartAchievement('youtube')}
                      className="mt-1"
                    />
                    <div className="text-3xl md:text-4xl">🔥</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">YouTube</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm">急上昇 音楽ランキング</p>
                    </div>
                  </div>
                </div>

                {/* USEN */}
                <div className={`backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm transition-all ${
                  campaignChecklist.chartAchievements?.['usen'] 
                    ? 'bg-gradient-to-r from-purple-300/60 to-pink-300/60' 
                    : 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={campaignChecklist.chartAchievements?.['usen'] || false}
                      onCheckedChange={() => toggleChartAchievement('usen')}
                      className="mt-1"
                    />
                    <div className="text-3xl md:text-4xl">🎤</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">USEN 推しリク</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm">デイリーランキング</p>
                    </div>
                  </div>
                </div>

                {/* LINE MUSIC */}
                <div className={`backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm transition-all ${
                  campaignChecklist.chartAchievements?.['linemusic'] 
                    ? 'bg-gradient-to-r from-green-300/60 to-emerald-300/60' 
                    : 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={campaignChecklist.chartAchievements?.['linemusic'] || false}
                      onCheckedChange={() => toggleChartAchievement('linemusic')}
                      className="mt-1"
                    />
                    <div className="text-3xl md:text-4xl">🎵</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">LINE MUSIC</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm">デイリーランキング</p>
                    </div>
                  </div>
                </div>

                {/* Oricon */}
                <div className={`backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm transition-all ${
                  campaignChecklist.chartAchievements?.['oricon'] 
                    ? 'bg-gradient-to-r from-orange-300/60 to-yellow-300/60' 
                    : 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={campaignChecklist.chartAchievements?.['oricon'] || false}
                      onCheckedChange={() => toggleChartAchievement('oricon')}
                      className="mt-1"
                    />
                    <div className="text-3xl md:text-4xl">📊</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">オリコン</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm">週間デジタルシングル</p>
                      <p className="text-gray-800 text-xs md:text-sm">毎週水曜発表・DL集計</p>
                    </div>
                  </div>
                </div>

                {/* Billboard JAPAN HOT100 */}
                <div className={`backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm transition-all ${
                  campaignChecklist.chartAchievements?.['billboard'] 
                    ? 'bg-gradient-to-r from-blue-300/60 to-cyan-300/60' 
                    : 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 opacity-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={campaignChecklist.chartAchievements?.['billboard'] || false}
                      onCheckedChange={() => toggleChartAchievement('billboard')}
                      className="mt-1"
                    />
                    <div className="text-3xl md:text-4xl">📈</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">Billboard JAPAN HOT100</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm">毎週水曜更新</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Digital Campaign Section */}
        <div ref={campaignRef} className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
          <button
            onClick={() => setOpenDigitalCampaign(!openDigitalCampaign)}
            className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <h2 className="text-white drop-shadow-lg text-lg md:text-xl">デジタルキャンペーン</h2>
            </div>
            {openDigitalCampaign ? 
              <ChevronUp className="w-5 h-5 text-white/70" /> : 
              <ChevronDown className="w-5 h-5 text-white/70" />
            }
          </button>
          
          {openDigitalCampaign && (
            <div className="space-y-4">
              {/* ①単曲ダウンロードキャンペーン */}
              <div className="border-2 border-white/40 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenDownloadCampaign(!openDownloadCampaign)}
                  className="w-full flex items-center justify-between p-3 md:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <h3 className="text-white drop-shadow font-semibold text-sm md:text-base">①単曲ダウンロードキャンペーン</h3>
                  </div>
                  {openDownloadCampaign ? 
                    <ChevronUp className="w-5 h-5 text-white/70" /> : 
                    <ChevronDown className="w-5 h-5 text-white/70" />
                  }
                </button>
                
                {openDownloadCampaign && (
                  <div className="p-3 md:p-4 bg-white/5 backdrop-blur-sm">
                    {/* Campaign Details */}
                    <div className="mb-4 p-3 md:p-4 bg-blue-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-gray-900 drop-shadow font-semibold mb-2 text-sm md:text-base">🎁 特典内容</p>
                      <p className="text-black text-xs md:text-sm mb-2 font-semibold">
                        各メンバーのソロアーティスト写真(アザーカット)
                      </p>
                      <p className="text-black text-xs font-semibold">※1回のご応募でメンバー全員分プレゼント</p>
                    </div>

                    <div className="mb-4 p-3 md:p-4 bg-purple-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-gray-900 drop-shadow font-semibold mb-2 text-sm md:text-base">📅 応募��間</p>
                      <p className="text-black text-xs md:text-sm font-semibold">
                        2026年3月23日(月) 12:00 ～ 3月30日(月) 18:00
                      </p>
                    </div>

                    <div className="mb-4 p-3 md:p-4 bg-green-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-gray-900 drop-shadow font-semibold mb-2 text-sm md:text-base">📝 対象サービス</p>
                      <p className="text-black text-xs md:text-sm font-semibold">
                        iTunes / Amazon Music / レコチョク / mora
                      </p>
                    </div>

                    <div className="mb-4">
                      <a 
                        href="https://form.universal-music.co.jp/dl_mazzel_guad/page/form.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-pink-500/80 to-purple-500/80 hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-lg"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Gift className="w-5 h-5" />
                          <span>キャンペーン応募ページへ</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <p className="text-xs mt-1 text-white/80">※3月23日(月)12時よりアクセス可能</p>
                      </a>
                    </div>

                    <div className="space-y-3 md:space-y-4 mb-4">
                      {services.map((service) => (
                        <div 
                          key={service.name}
                          className={`border-2 border-white/30 rounded-lg p-3 md:p-4 hover:border-white/50 transition-colors bg-gradient-to-r ${service.color} bg-opacity-30 backdrop-blur-sm shadow-lg`}
                        >
                          <div className="flex items-start gap-2 md:gap-3">
                            <span className="text-2xl md:text-3xl flex-shrink-0">{service.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="mb-2 md:mb-3 text-white drop-shadow font-semibold text-base md:text-lg">{service.name}</h4>
                              
                              <div className="space-y-2">
                                {/* Purchase Link */}
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={purchaseChecklist[service.name]?.purchased || false}
                                    onCheckedChange={() => togglePurchase(service.name)}
                                    id={`purchase-${service.name}`}
                                    className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 flex-shrink-0"
                                  />
                                  <Button
                                    className={`flex-1 bg-gradient-to-r ${service.buttonColor} hover:opacity-90 text-white text-sm md:text-base h-9 md:h-10`}
                                    onClick={() => window.open(service.purchaseUrl, '_blank')}
                                    disabled={service.purchaseUrl === '#'}
                                  >
                                    <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                                    <span className="truncate">{service.purchaseUrl === '#' ? 'メンテナンス中' : '購入する'}</span>
                                    {service.purchaseUrl !== '#' && <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 flex-shrink-0" />}
                                  </Button>
                                </div>
                                
                                {/* Campaign Link */}
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={purchaseChecklist[service.name]?.campaigned || false}
                                    onCheckedChange={() => toggleCampaign(service.name)}
                                    id={`campaign-${service.name}`}
                                    className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 flex-shrink-0"
                                  />
                                  <Button
                                    variant="outline"
                                    className="flex-1 border-white/50 bg-white/20 text-white hover:bg-white/30 text-sm md:text-base h-9 md:h-10 font-semibold"
                                    onClick={() => window.open(service.applicationUrl, '_blank')}
                                  >
                                    <Gift className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                                    <span className="truncate">キャンペーン応募</span>
                                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 flex-shrink-0" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-3 md:p-4 bg-orange-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-gray-900 drop-shadow font-semibold mb-3 text-sm md:text-base">💡 応募方法</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.downloadSteps?.['step1'] || false}
                            onCheckedChange={() => toggleDownloadStep('step1')}
                            id="download-step1"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="download-step1" className="text-gray-900 text-xs md:text-sm cursor-pointer">
                            対象サービスで「Get Up And Dance」をダウンロード購入
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.downloadSteps?.['step2'] || false}
                            onCheckedChange={() => toggleDownloadStep('step2')}
                            id="download-step2"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="download-step2" className="text-gray-900 text-xs md:text-sm cursor-pointer">
                            購入画面（購入履歴）のスクリーンショットを撮影
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.downloadSteps?.['step3'] || false}
                            onCheckedChange={() => toggleDownloadStep('step3')}
                            id="download-step3"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="download-step3" className="text-gray-900 text-xs md:text-sm cursor-pointer">
                            応募サイトへスクリーンショットをアップロード
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.downloadSteps?.['step4'] || false}
                            onCheckedChange={() => toggleDownloadStep('step4')}
                            id="download-step4"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="download-step4" className="text-gray-900 text-xs md:text-sm cursor-pointer">
                            必要事項を記入してご応募
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ②ショート動画投稿キャンペーン */}
              <div className="border-2 border-white/40 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenVideoCampaign(!openVideoCampaign)}
                  className="w-full flex items-center justify-between p-3 md:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-white" />
                    <h3 className="text-white drop-shadow font-semibold text-sm md:text-base">②ショート動画投稿キャンペーン</h3>
                  </div>
                  {openVideoCampaign ? 
                    <ChevronUp className="w-5 h-5 text-white/70" /> : 
                    <ChevronDown className="w-5 h-5 text-white/70" />
                  }
                </button>
                
                {openVideoCampaign && (
                  <div className="p-3 md:p-4 bg-white/5 backdrop-blur-sm">
                    <div className="mb-4 p-3 md:p-4 bg-gradient-to-r from-pink-400/40 to-purple-400/40 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-black text-xs md:text-sm leading-relaxed font-semibold">
                        「Get Up And Dance」の公式音源を使用してTikTok、Instagram Reel、YouTube Shortsのいずれかで動画投稿いただいた方全員に「新生活応援手書きメッセージ画像」をプレゼント！
                      </p>
                      <p className="text-black text-xs mt-2 font-semibold">
                        投稿いただく動画は「Get Up And Dance」にあわせて、ダンスはもちろん、オリジナル動画もOK！
                      </p>
                    </div>

                    <div className="mb-4 p-3 md:p-4 bg-blue-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-black drop-shadow font-semibold mb-2 text-sm md:text-base">🎁 特典内容</p>
                      <p className="text-black text-xs md:text-sm font-semibold">
                        全員に「新生活応援手書きメッセージ画像」をプレゼント
                      </p>
                    </div>

                    <div className="mb-4 p-3 md:p-4 bg-purple-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-black drop-shadow font-semibold mb-2 text-sm md:text-base">📅 応募期間</p>
                      <p className="text-black text-xs md:text-sm font-semibold">
                        2026年3月24日(火) 12:00 ～ 4月3日(金) 18:00
                      </p>
                    </div>

                    <div className="mb-4">
                      <a 
                        href="https://form.universal-music.co.jp/sns_mazzel_guad_video/page/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-pink-500/80 to-red-500/80 hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-lg"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Gift className="w-5 h-5" />
                          <span>キャンペーン応募ページへ</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <p className="text-xs mt-1 text-white/80">※3月24日(火)12時よりアクセス可能</p>
                      </a>
                    </div>

                    <div className="mb-4 p-3 md:p-4 bg-yellow-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-black drop-shadow font-semibold mb-2 text-sm md:text-base">🎵 公式音源</p>
                      <div className="space-y-2">
                        <a 
                          href="https://mazzel.lnk.to/GUAD_intro"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white/30 hover:bg-white/40 p-2 rounded text-black text-xs md:text-sm transition-colors font-medium"
                        >
                          MAZZEL「Get Up And Dance」 <ExternalLink className="w-3 h-3 inline ml-1" />
                        </a>
                        <a 
                          href="https://vt.tiktok.com/ZS9R4fAaWTuyQ-Xkhoo/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white/30 hover:bg-white/40 p-2 rounded text-black text-xs md:text-sm transition-colors font-medium"
                        >
                          TikTok「Get Up And Dance」1サビ ver. <ExternalLink className="w-3 h-3 inline ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="mb-4 p-3 md:p-4 bg-green-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-black drop-shadow font-semibold mb-3 text-sm md:text-base">✅ 投稿の必須項目</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.videoSteps?.['requirement1'] || false}
                            onCheckedChange={() => toggleVideoStep('requirement1')}
                            id="video-requirement1"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="video-requirement1" className="text-black text-xs md:text-sm cursor-pointer">
                            MAZZEL「Get Up And Dance」を音源として設定
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.videoSteps?.['requirement2'] || false}
                            onCheckedChange={() => toggleVideoStep('requirement2')}
                            id="video-requirement2"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="video-requirement2" className="text-black text-xs md:text-sm cursor-pointer">
                            ハッシュタグ「#MAZZEL_GetUpAndDance」を付けて投稿
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 md:p-4 bg-orange-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-black drop-shadow font-semibold mb-3 text-sm md:text-base">💡 応募方法</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.videoSteps['step1'] || false}
                            onCheckedChange={() => toggleVideoStep('step1')}
                            id="video-step1"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="video-step1" className="text-black text-xs md:text-sm cursor-pointer">
                            STEP 1: 「Get Up And Dance」の音源を使用した動画を作成
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.videoSteps['step2'] || false}
                            onCheckedChange={() => toggleVideoStep('step2')}
                            id="video-step2"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="video-step2" className="text-black text-xs md:text-sm cursor-pointer">
                            STEP 2: ハッシュタグ「#MAZZEL_GetUpAndDance」を付けて投稿
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.videoSteps['step3'] || false}
                            onCheckedChange={() => toggleVideoStep('step3')}
                            id="video-step3"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="video-step3" className="text-black text-xs md:text-sm cursor-pointer">
                            STEP 3: 投稿のスクリーンショットをエントリーフォームからアップロード
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ③Spotify Canvasシェアキャンペーン */}
              <div className="border-2 border-white/40 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenSpotifyCampaign(!openSpotifyCampaign)}
                  className="w-full flex items-center justify-between p-3 md:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-white" />
                    <h3 className="text-white drop-shadow font-semibold text-sm md:text-base">③Spotify Canvasシェアキャンペーン</h3>
                  </div>
                  {openSpotifyCampaign ? 
                    <ChevronUp className="w-5 h-5 text-white/70" /> : 
                    <ChevronDown className="w-5 h-5 text-white/70" />
                  }
                </button>
                
                {openSpotifyCampaign && (
                  <div className="p-3 md:p-4 bg-white/5 backdrop-blur-sm">
                    <div className="mb-4 p-3 md:p-4 bg-gradient-to-r from-green-400/40 to-blue-400/40 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-black text-xs md:text-sm leading-relaxed font-semibold">
                        3/24(火)17:00以降Spotifyにて「Get Up And Dance」を再生し、ご自身のInstagramもしくはXにてメンバーソロCanvasをシェアいただいた方全員にメンバーソロスマホ待受画像をプレゼント！
                      </p>
                      <p className="text-black text-xs mt-2 font-semibold">
                        各メンバー1回ずつ・合計8回エントリーが可能！
                      </p>
                    </div>

                    <div className="mb-4 p-3 md:p-4 bg-blue-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-gray-900 drop-shadow font-semibold mb-2 text-sm md:text-base">🎁 特典内容</p>
                      <p className="text-black text-xs md:text-sm font-semibold">
                        メンバーソロスマホ待受画像
                      </p>
                      <p className="text-black text-xs mt-2 font-semibold">
                        ※Spotify Canvasをシェアしたメンバーの待受画像がもらえる
                      </p>
                    </div>

                    <div className="mb-4 p-3 md:p-4 bg-purple-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-gray-900 drop-shadow font-semibold mb-3 text-sm md:text-base">📅 エントリースケジュール</p>
                      <div className="space-y-2">
                        {[
                          { name: 'KAIRYU', date: '3/24(火) 17:00' },
                          { name: 'NAOYA', date: '3/25(水) 17:00' },
                          { name: 'RAN', date: '3/26(木) 17:00' },
                          { name: 'SEITO', date: '3/27(金) 17:00' },
                          { name: 'RYUKI', date: '3/28(土) 17:00' },
                          { name: 'TAKUTO', date: '3/29(日) 17:00' },
                          { name: 'HAYATO', date: '3/30(月) 17:00' },
                          { name: 'EIKI', date: '3/31(火) 17:00' }
                        ].map((member) => (
                          <div key={member.name} className="flex items-center gap-2">
                            <Checkbox
                              checked={campaignChecklist.spotifyMembers[member.name] || false}
                              onCheckedChange={() => toggleSpotifyMember(member.name)}
                              id={`spotify-${member.name}`}
                              className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                            <label htmlFor={`spotify-${member.name}`} className="text-gray-900 text-xs md:text-sm cursor-pointer">
                              {member.name}: {member.date}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-900 text-xs mt-3 font-semibold">
                        応募締め切り: 2026年4月1日(水) 18:00
                      </p>
                    </div>

                    <div className="mb-4">
                      <a 
                        href="https://form.universal-music.co.jp/sns_mazzel_guad/page/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-green-500/80 to-blue-500/80 hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-lg"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Gift className="w-5 h-5" />
                          <span>キャンペーン応募ページへ</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <p className="text-xs mt-1 text-white/80">※3月24日(火)17時よりアクセス可能</p>
                      </a>
                    </div>

                    <div className="mb-4">
                      <a 
                        href="https://open.spotify.com/album/75zcHOYgdJAQvUpR2ySLQG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-green-600/80 to-green-500/80 hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-lg"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Music className="w-5 h-5" />
                          <span>Spotifyで聴く</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </a>
                    </div>

                    <div className="p-3 md:p-4 bg-orange-400/30 backdrop-blur-sm rounded-lg border border-white/30">
                      <p className="text-gray-900 drop-shadow font-semibold mb-3 text-sm md:text-base">💡 応募方法</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.spotifySteps['step1'] || false}
                            onCheckedChange={() => toggleSpotifyStep('step1')}
                            id="spotify-step1"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="spotify-step1" className="text-gray-900 text-xs md:text-sm cursor-pointer">
                            STEP 1: Spotifyで「Get Up And Dance」にアクセス
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.spotifySteps['step2'] || false}
                            onCheckedChange={() => toggleSpotifyStep('step2')}
                            id="spotify-step2"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="spotify-step2" className="text-gray-900 text-xs md:text-sm cursor-pointer">
                            STEP 2: 再生してCanvasからInstagramまたはXへシェア
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.spotifySteps['step3'] || false}
                            onCheckedChange={() => toggleSpotifyStep('step3')}
                            id="spotify-step3"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="spotify-step3" className="text-gray-900 text-xs md:text-sm cursor-pointer">
                            STEP 3: ハッシュタグ「#MAZZEL_GetUpAndDance」を付ける
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={campaignChecklist.spotifySteps['step4'] || false}
                            onCheckedChange={() => toggleSpotifyStep('step4')}
                            id="spotify-step4"
                            className="border-orange-400/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 mt-0.5"
                          />
                          <label htmlFor="spotify-step4" className="text-gray-900 text-xs md:text-sm cursor-pointer">
                            STEP 4: シェアした投稿のスクリーンショットをエントリーフォームからアップロード
                          </label>
                        </div>
                      </div>
                      <p className="text-gray-800 text-xs mt-3">※Canvasはスマートフォンでのみ閲覧可能です</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Schedule Section */}
        <div ref={scheduleRef} className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
          <button
            onClick={() => setOpenSchedule(!openSchedule)}
            className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <h2 className="text-white drop-shadow-lg text-lg md:text-xl">スケジュール</h2>
            </div>
            {openSchedule ? 
              <ChevronUp className="w-5 h-5 text-white/70" /> : 
              <ChevronDown className="w-5 h-5 text-white/70" />
            }
          </button>
          
          {openSchedule && (
            <div className="space-y-3">{scheduleData.map(scheduleDate => (
              <div key={scheduleDate.date} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 overflow-hidden">
                <button
                  onClick={() => toggleScheduleDate(scheduleDate.date)}
                  className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`${getDayColor(scheduleDate.dayOfWeek)} text-white px-3 py-1 rounded-lg text-sm md:text-base font-semibold whitespace-nowrap`}>
                      {scheduleDate.date}
                    </div>
                    <span className="text-white/90 text-sm md:text-base">({scheduleDate.dayOfWeek})</span>
                  </div>
                </button>
                
                {openScheduleDates[scheduleDate.date] && (
                  <div className="p-3 md:p-4 pt-0 space-y-3">
                    {scheduleDate.events.map((event, idx) => {
                      const bgColors = [
                        'bg-orange-300/60',
                        'bg-cyan-300/60',
                        'bg-pink-300/60',
                        'bg-yellow-300/60',
                        'bg-purple-300/60'
                      ];
                      const bgColor = bgColors[idx % bgColors.length];
                      
                      return (
                        <div key={idx} className={bgColor + ' backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm'}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-start gap-2 mb-2 flex-wrap">
                                {event.category && (
                                  <span className={getCategoryColor(event.category) + ' text-white px-2 py-0.5 rounded text-xs font-semibold'}>
                                    {event.category}
                                  </span>
                                )}
                                {event.time && (
                                  <span className="text-gray-800 text-xs md:text-sm font-medium">{event.time}</span>
                                )}
                              </div>
                              <p className="text-gray-900 font-medium text-sm md:text-base">{event.title}</p>
                            </div>
                            {event.url && (
                              <a 
                                href={event.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-gray-900 transition-colors flex-shrink-0"
                                aria-label="Link"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}</div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-4 md:mt-6 text-center text-white drop-shadow text-sm md:text-base">
          <p>※ これは非公式サイトです</p>
          <p className="mt-1">キャンペーンの詳細は各サイトでご確認ください</p>
        </div>
      </div>
    </div>
  );
}
