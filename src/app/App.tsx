import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Music, Calendar, ExternalLink, Gift, ShoppingCart, Instagram, Youtube, ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import backgroundImage from 'figma:asset/201ec8a744c7965c9c4ec55aa5afc1407deb78dd.png';
import banquetCalendar from 'figma:asset/9fa41d71b3ceb4982993d0b1cc6f918c3a424b09.png';
import banquetInfo from 'figma:asset/6bf80a24b7ee5a97032ad1adc5cec42a738b6fff.png';
import banquetSerial from 'figma:asset/633fa7c73571579211b10945f7482a044d338187.png';
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
    purchaseUrl: 'https://music.apple.com/jp/', 
    applicationUrl: 'https://embed-sync-13941919.figma.site/itunes',
    color: 'from-pink-200/40 to-rose-200/40',
    buttonColor: 'from-pink-400/80 to-rose-400/80'
  },
  { 
    name: 'レコチョク', 
    icon: '🎵',
    purchaseUrl: 'https://recochoku.jp/', 
    applicationUrl: 'https://embed-sync-13941919.figma.site/recochoku',
    color: 'from-orange-200/40 to-red-200/40',
    buttonColor: 'from-orange-400/80 to-red-400/80'
  },
  { 
    name: 'うたギフト', 
    icon: '🎁',
    purchaseUrl: 'https://utagift.com/', 
    applicationUrl: 'https://embed-sync-13941919.figma.site/utagift',
    color: 'from-yellow-200/40 to-orange-200/40',
    buttonColor: 'from-yellow-400/80 to-orange-400/80'
  },
  { 
    name: 'mora', 
    icon: '🎧',
    purchaseUrl: 'https://mora.jp/', 
    applicationUrl: 'https://embed-sync-13941919.figma.site/mora',
    color: 'from-blue-200/40 to-indigo-200/40',
    buttonColor: 'from-blue-400/80 to-indigo-400/80'
  },
  { 
    name: 'Amazon Music', 
    icon: '🛒',
    purchaseUrl: 'https://music.amazon.co.jp/', 
    applicationUrl: 'https://embed-sync-13941919.figma.site/amazon',
    color: 'from-cyan-200/40 to-blue-200/40',
    buttonColor: 'from-cyan-400/80 to-blue-400/80'
  },
  { 
    name: 'mu-mo', 
    icon: '🎶',
    purchaseUrl: 'https://mu-mo.net/', 
    applicationUrl: 'https://embed-sync-13941919.figma.site/mumo',
    color: 'from-purple-200/40 to-pink-200/40',
    buttonColor: 'from-purple-400/80 to-pink-400/80'
  },
  { 
    name: 'dミュージック', 
    icon: '📱',
    purchaseUrl: 'https://music.dmkt-sp.jp/', 
    applicationUrl: 'https://embed-sync-13941919.figma.site/dmusic',
    color: 'from-red-200/40 to-pink-200/40',
    buttonColor: 'from-red-400/80 to-pink-400/80'
  },
];

interface PurchaseChecklist {
  [key: string]: {
    purchased: boolean;
    campaigned: boolean;
  };
}

export default function App() {
  const [purchaseChecklist, setPurchaseChecklist] = useState<PurchaseChecklist>(() => {
    const saved = localStorage.getItem("mazzel-purchase-checklist");
    return saved ? JSON.parse(saved) : {};
  });

  const [openScheduleDates, setOpenScheduleDates] = useState<{ [key: string]: boolean }>({
    '3/23': true // デフォルトで最初の日付を開く
  });

  const [openSupportSections, setOpenSupportSections] = useState<{ [key: string]: boolean }>({
    'info': true,
    'dl': false,
    'st': false,
    'mv': false,
    'other': false
  });

  const [openDownloadCampaign, setOpenDownloadCampaign] = useState(true);
  const [openImportantPoints, setOpenImportantPoints] = useState(true);
  const [openBanquetInfo, setOpenBanquetInfo] = useState(false);
  const [openChartHistory, setOpenChartHistory] = useState(true);

  useEffect(() => {
    localStorage.setItem("mazzel-purchase-checklist", JSON.stringify(purchaseChecklist));
  }, [purchaseChecklist]);

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

  const totalTasks = services.length * 2;
  const completedTasks = Object.values(purchaseChecklist).reduce((acc, curr) => {
    return acc + (curr.purchased ? 1 : 0) + (curr.campaigned ? 1 : 0);
  }, 0);

  const toggleScheduleDate = (date: string) => {
    setOpenScheduleDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const toggleSupportSection = (section: string) => {
    setOpenSupportSections(prev => ({
      ...prev,
      [section]: !prev[section]
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
          title: 'YouTube Live'
        },
        {
          time: '21:00',
          title: 'Music Video YouTube Premiere'
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
      dayOfWeek: 'Thu',
      events: [
        {
          time: '19:30',
          title: 'Stationhead'
        }
      ]
    },
    {
      date: '3/25',
      dayOfWeek: 'Wed',
      events: [
        {
          time: '19:30',
          title: 'Stationhead'
        }
      ]
    },
    {
      date: '3/26',
      dayOfWeek: 'Thu',
      events: [
        {
          time: '19:30',
          title: 'Stationhead'
        }
      ]
    },
    {
      date: '3/28',
      dayOfWeek: 'Sat',
      events: [
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
      dayOfWeek: 'Thu',
      events: [
        {
          time: '19:10 - 21:35',
          category: 'TV',
          title: 'アオショー！エクステンデッド版（映画・チャンネルNECO) - RAN'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 relative">
      {/* Background Image with slight blur */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(2px)',
          transform: 'scale(1.05)' // Prevent white edges from blur
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-black/20"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full mb-6 shadow-lg text-sm md:text-base border border-white/30">
            <Music className="w-4 h-4 md:w-5 md:h-5" />
            <span>MUZE 非公式サポートサイト</span>
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
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
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
                <div className="bg-gradient-to-r from-amber-300/60 to-yellow-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl md:text-4xl">👑</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">mora</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm mb-1">都道府県別DLランキング 全国制覇目標</p>
                      <p className="text-gray-800 text-xs md:text-sm">47都道府県すべてで1位を目指す</p>
                    </div>
                  </div>
                </div>

                {/* YouTube */}
                <div className="bg-gradient-to-r from-red-300/60 to-pink-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl md:text-4xl">🔥</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">YouTube</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm mb-1">急上昇 音楽ランキング 1位目標</p>
                      <p className="text-gray-800 text-xs md:text-sm">Music Video 公開後に急上昇を狙う</p>
                    </div>
                  </div>
                </div>

                {/* LINE MUSIC */}
                <div className="bg-gradient-to-r from-green-300/60 to-emerald-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl md:text-4xl">🎵</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">LINE MUSIC</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm mb-1">デイリーランキング 1位目標</p>
                      <p className="text-gray-800 text-xs md:text-sm">日替わり手書きメッセージキャンペーン参加</p>
                    </div>
                  </div>
                </div>

                {/* USEN */}
                <div className="bg-gradient-to-r from-purple-300/60 to-pink-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl md:text-4xl">🎤</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">USEN 推しリク</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm mb-1">デイリーランキング 1位目標</p>
                      <p className="text-gray-800 text-xs md:text-sm">推し活リクエスト集計・デイリー1位を目指す</p>
                    </div>
                  </div>
                </div>

                {/* Billboard JAPAN HOT100 */}
                <div className="bg-gradient-to-r from-blue-300/60 to-cyan-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl md:text-4xl">📊</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">Billboard JAPAN HOT100</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm mb-1">上位ランクイン目標</p>
                      <p className="text-gray-800 text-xs md:text-sm">毎週水曜更新・初週が重要</p>
                    </div>
                  </div>
                </div>

                {/* Oricon */}
                <div className="bg-gradient-to-r from-orange-300/60 to-yellow-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl md:text-4xl">📊</div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm md:text-base mb-1">オリコン</p>
                      <p className="text-gray-900 font-semibold text-xs md:text-sm mb-1">週間デジタルシングル 上位目標</p>
                      <p className="text-gray-800 text-xs md:text-sm">毎週水曜発表・DL集計</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Song Info & Support Methods Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Music className="w-5 h-5 md:w-6 md:h-6 text-white" />
            <h2 className="text-white drop-shadow-lg text-lg md:text-xl">楽曲情報・応援方法</h2>
          </div>

          <div className="space-y-3">
            {/* 楽曲情報 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleSupportSection('info')}
                className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎧</span>
                  <span className="text-white drop-shadow font-semibold text-sm md:text-base">楽曲情報</span>
                </div>
                {openSupportSections.info ? 
                  <ChevronUp className="w-5 h-5 text-white/70" /> : 
                  <ChevronDown className="w-5 h-5 text-white/70" />
                }
              </button>
              
              {openSupportSections.info && (
                <div className="p-3 md:p-4 pt-0">
                  <div className="bg-gradient-to-r from-orange-300/60 to-pink-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <div className="space-y-2 text-gray-900 text-sm md:text-base">
                      <p><strong>曲名：</strong>Get Up And Dance</p>
                      <p><strong>アーティスト：</strong>MAZZEL</p>
                      <p><strong>配信日：</strong>2026年3月23日</p>
                      <p><strong>目的：</strong>Billboard Japan Hot 100 上位を目指すための応援方法まとめ</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-gradient-to-r from-blue-300/60 to-cyan-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="text-gray-900 font-semibold mb-2 text-sm md:text-base">📊 集計期間</p>
                    <div className="space-y-1 text-gray-900 text-sm md:text-base">
                      <p>• 毎週 月曜〜日曜 23:59まで</p>
                      <p>• <strong>初週：3/23（月）〜3/29（日）</strong></p>
                      <p>• <strong className="text-red-600">先ヨミ（速報）対象：〜3/25（水）まで</strong></p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DL（ダウンロード） */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleSupportSection('dl')}
                className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💾</span>
                  <span className="text-white drop-shadow font-semibold text-sm md:text-base">① DL（ダウンロード）</span>
                </div>
                {openSupportSections.dl ? 
                  <ChevronUp className="w-5 h-5 text-white/70" /> : 
                  <ChevronDown className="w-5 h-5 text-white/70" />
                }
              </button>
              
              {openSupportSections.dl && (
                <div className="p-3 md:p-4 pt-0">
                  <div className="bg-gradient-to-r from-pink-300/60 to-rose-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <div className="space-y-2 text-gray-900 text-sm md:text-base">
                      <p className="font-semibold text-base md:text-lg mb-2">"単曲"で購入ダウンロード</p>
                      <p className="flex items-center gap-2">
                        <span className="text-xl">🌸</span>
                        <span><strong className="text-red-600">できるだけ直後に！</strong></span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-xl">🌸</span>
                        <span><strong className="text-red-600">できるだけ当日に！</strong></span>
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-800/20">
                        <p>• <strong>対象サービス：</strong>iTunes Store / Amazon Music / レコチョク / mora / mu-mo</p>
                        <p className="flex items-start gap-2 mt-2">
                          <span>🎁</span>
                          <span><strong>ギフトも対象です</strong></span>
                        </p>
                      </div>
                      <div className="mt-3 p-2 bg-white/40 rounded">
                        <p className="text-red-600 font-bold">⚠️ アルバムのバンドル予約をする場合も、先に単曲購入をしましょう</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ST（ストリーミング） */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleSupportSection('st')}
                className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎵</span>
                  <span className="text-white drop-shadow font-semibold text-sm md:text-base">② ST（ストリーミング）</span>
                </div>
                {openSupportSections.st ? 
                  <ChevronUp className="w-5 h-5 text-white/70" /> : 
                  <ChevronDown className="w-5 h-5 text-white/70" />
                }
              </button>
              
              {openSupportSections.st && (
                <div className="p-3 md:p-4 pt-0 space-y-3">
                  <div className="bg-gradient-to-r from-orange-300/60 to-yellow-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="font-semibold mb-2 text-gray-900 text-sm md:text-base">たくさん聴きましょう♪</p>
                    <div className="space-y-2 text-gray-900 text-sm md:text-base">
                      <div className="p-2 bg-white/40 rounded">
                        <p className="font-semibold">購入ダウンロードした曲は"削除"してから聴きましょう</p>
                        <p className="text-sm mt-1">再生がカウントされない条件があります。</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-300/60 to-pink-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="font-semibold mb-2 text-gray-900 text-sm md:text-base">対象サービス：</p>
                    <div className="space-y-1 text-gray-900 text-sm md:text-base">
                      <p>• Spotify Premium / Spotify Free</p>
                      <p>• Apple Music</p>
                      <p>• Amazon Music Unlimited</p>
                      <p>• YouTube Music</p>
                      <p>• Amazon Prime, LINE MUSIC, AWA</p>
                      <p>• Rakuten Music, KKBOX</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-300/60 to-blue-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="font-semibold mb-2 text-gray-900 text-sm md:text-base">プレイリストを活用して聴きましょう</p>
                    <div className="space-y-1 text-gray-900 text-sm md:text-base">
                      <p>• 応援用プレイリストを優先にお使いください</p>
                      <p>• サービスによりカウント条件などは異なります、事前にご確認ください</p>
                      <p>• <strong>LINE MUSICは単曲再生OK</strong></p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-300/60 to-emerald-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="font-semibold mb-2 text-gray-900 text-sm md:text-base">アーティストや楽曲へのいいね、着信音の設定など</p>
                    <div className="space-y-1 text-gray-900 text-sm md:text-base">
                      <p>登録・設定できるものは<strong className="text-red-600">すべて当日がおすすめ！</strong></p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-300/60 to-orange-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="font-semibold mb-2 text-gray-900 text-sm md:text-base">🎶 応援用プレイリスト</p>
                    <div className="space-y-2 text-gray-900 text-sm md:text-base">
                      <p className="font-semibold">次の3曲ループ構成でプレイリストの作成・共有をお願いします</p>
                      <div className="bg-white/50 rounded p-2 space-y-1">
                        <p><strong>1曲目：</strong>BANQUET BANG</p>
                        <p><strong>2曲目：</strong>Get Up And Dance (GUAD)</p>
                        <p><strong>3曲目：</strong>MAZZELの楽曲 (BMSGアーティストの最新曲なども可)</p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-800/20">
                        <p className="font-semibold mb-1">プレイリストの長さ：</p>
                        <p>• Spotify：3時間以内</p>
                        <p>• その他：1〜2時間程度</p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-800/20">
                        <p className="font-semibold mb-1">共有・検索タグ：</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">#MUZE_Spolist</span>
                          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">#MUZE_Applelist</span>
                          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">#MUZE_Amznlist</span>
                        </div>
                      </div>
                      <div className="mt-2 p-2 bg-orange-400/50 rounded">
                        <p className="font-semibold">共有されたプレイリストを優先に聴いていきましょう</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MV（YouTube） */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleSupportSection('mv')}
                className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📺</span>
                  <span className="text-white drop-shadow font-semibold text-sm md:text-base">③ MV（YouTube）</span>
                </div>
                {openSupportSections.mv ? 
                  <ChevronUp className="w-5 h-5 text-white/70" /> : 
                  <ChevronDown className="w-5 h-5 text-white/70" />
                }
              </button>
              
              {openSupportSections.mv && (
                <div className="p-3 md:p-4 pt-0 space-y-3">
                  <div className="bg-gradient-to-r from-orange-300/60 to-yellow-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="font-semibold mb-2 text-gray-900 text-sm md:text-base">Music Videoを楽しもう！</p>
                    <div className="space-y-2 text-gray-900 text-sm md:text-base">
                      <p className="font-semibold">Premiumも無料会員も</p>
                      <p><strong className="text-red-600">YouTubeにログインをしましょう</strong></p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-300/60 to-pink-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="font-semibold mb-2 text-gray-900 text-sm md:text-base">視聴方法</p>
                    <div className="space-y-1 text-gray-900 text-sm md:text-base">
                      <p>• 検索・登録チャンネルから</p>
                      <p>• <strong>1〜3曲の動画を挟んで視聴</strong></p>
                      <p>• <strong>広告は30秒は見ましょう</strong></p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-400/70 to-red-400/70 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-red-500/50">
                    <p className="font-semibold mb-2 text-white drop-shadow text-sm md:text-base">NG行動 ❌</p>
                    <div className="space-y-1 text-white drop-shadow text-sm md:text-base">
                      <p>• ミュート</p>
                      <p>• 連続自動再生</p>
                      <p>• 巻き戻し再生</p>
                      <p>• もう一度見る</p>
                      <p>• リロード</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-300/60 to-cyan-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <p className="font-semibold mb-2 text-gray-900 text-sm md:text-base">集計締め日</p>
                    <div className="space-y-1 text-gray-900 text-sm md:text-base">
                      <p><strong className="text-red-600">プレミア公開から〜3/29（日）</strong> 初週集計締め日</p>
                      <p className="text-sm mt-1">以降、毎週日曜日が集計締</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* その他（加点要素） */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleSupportSection('other')}
                className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">✨</span>
                  <span className="text-white drop-shadow font-semibold text-sm md:text-base">④ その他（加点要素）</span>
                </div>
                {openSupportSections.other ? 
                  <ChevronUp className="w-5 h-5 text-white/70" /> : 
                  <ChevronDown className="w-5 h-5 text-white/70" />
                }
              </button>
              
              {openSupportSections.other && (
                <div className="p-3 md:p-4 pt-0">
                  <div className="bg-gradient-to-r from-green-300/60 to-emerald-300/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                    <div className="space-y-1 text-gray-900 text-sm md:text-base">
                      <p>• SNSでシェア・拡散</p>
                      <p>• ハッシュタグ：<strong>#MAZZEL_GetUpAndDance</strong></p>
                      <p>• ラジオリクエスト</p>
                      <p>• 歌詞サイト閲覧（Geniusなど）</p>
                      <p>• USENリクエスト</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 重要ポイントまとめ */}
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 overflow-hidden">
            <button
              onClick={() => setOpenImportantPoints(!openImportantPoints)}
              className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🧠</span>
                <span className="text-white drop-shadow font-semibold text-sm md:text-base">重要ポイントまとめ</span>
              </div>
              {openImportantPoints ? 
                <ChevronUp className="w-5 h-5 text-white/70" /> : 
                <ChevronDown className="w-5 h-5 text-white/70" />
              }
            </button>
            
            {openImportantPoints && (
              <div className="p-3 md:p-4 pt-0">
                <div className="bg-gradient-to-r from-orange-500/30 to-red-500/30 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-orange-400/50">
                  <ul className="text-white drop-shadow text-xs md:text-sm space-y-1">
                    <li>• <strong>初週（特に最初の3日）が超重要</strong></li>
                    <li>• DL・ST・MVをバランスよくやる</li>
                    <li>• "正しい再生方法"を守らないとカウントされない</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
            <h2 className="text-white drop-shadow-lg text-lg md:text-xl">スケジュール</h2>
          </div>
          <div className="space-y-3">{scheduleData.map(scheduleDate => (
            <div key={scheduleDate.date} className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleScheduleDate(scheduleDate.date)}
                className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm md:text-base font-semibold whitespace-nowrap">
                    {scheduleDate.date}
                  </div>
                  <span className="text-white/90 text-sm md:text-base">({scheduleDate.dayOfWeek})</span>
                </div>
                {openScheduleDates[scheduleDate.date] ? 
                  <ChevronUp className="w-5 h-5 text-white/70" /> : 
                  <ChevronDown className="w-5 h-5 text-white/70" />
                }
              </button>
              
              {openScheduleDates[scheduleDate.date] && (
                <div className="p-3 md:p-4 pt-0 space-y-3">
                  {scheduleDate.events.map((event, idx) => {
                    // イベントごとに異なる背景色を設定
                    const bgColors = [
                      'bg-orange-300/60',
                      'bg-cyan-300/60',
                      'bg-pink-300/60',
                      'bg-yellow-300/60',
                      'bg-purple-300/60'
                    ];
                    const bgColor = bgColors[idx % bgColors.length];
                    
                    return (
                      <div key={idx} className={`${bgColor} backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 shadow-sm`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-start gap-2 mb-2 flex-wrap">
                              {event.category && (
                                <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                                  [{event.category}]
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
          ))}
          </div>
        </div>

        {/* Progress Bar */}
        {/* <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <h3 className="text-white drop-shadow-lg text-base md:text-lg">進捗状況</h3>
            <span className="text-white drop-shadow">
              {completedTasks} / {totalTasks}
            </span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 via-blue-500 to-red-500 transition-all duration-300"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>
        </div> */}

        {/* Download Campaign Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
          <button
            onClick={() => setOpenDownloadCampaign(!openDownloadCampaign)}
            className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <h2 className="text-white drop-shadow-lg text-lg md:text-xl">ダウンロードキャンペーン</h2>
            </div>
            {openDownloadCampaign ? 
              <ChevronUp className="w-5 h-5 text-white/70" /> : 
              <ChevronDown className="w-5 h-5 text-white/70" />
            }
          </button>
          
          {openDownloadCampaign && (
            <>
              <div className="space-y-3 md:space-y-4">
                {services.map((service) => (
                  <div 
                    key={service.name}
                    className={`border-2 border-white/30 rounded-lg p-3 md:p-5 hover:border-white/50 transition-colors bg-gradient-to-r ${service.color} bg-opacity-30 backdrop-blur-sm shadow-lg`}
                  >
                    <div className="flex items-start gap-2 md:gap-3">
                      <span className="text-2xl md:text-3xl flex-shrink-0">{service.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="mb-2 md:mb-3 text-white drop-shadow text-base md:text-lg font-semibold">{service.name}</h3>
                        
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
                            >
                              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" />
                              <span className="truncate">購入する</span>
                              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 flex-shrink-0" />
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
                              className="flex-1 border-white/50 bg-white/20 text-white hover:bg-white/30 text-sm md:text-base h-9 md:h-10"
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
              
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-orange-500/20 backdrop-blur-sm rounded-lg border border-orange-400/30">
                <p className="text-white drop-shadow font-semibold mb-2 text-sm md:text-base">💡 応援のポイント</p>
                <ul className="text-white/90 text-xs md:text-sm space-y-1">
                  <li>• 複数のサービスで購入すると各チャートに貢献できます</li>
                  <li>• キャンペーン応募も忘れずに！</li>
                  <li>• 購入後はSNSでシェアしよう</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Banquet Album Info Section */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl mb-6">
          <button
            onClick={() => setOpenBanquetInfo(!openBanquetInfo)}
            className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <h2 className="text-white drop-shadow-lg text-lg md:text-xl">2nd Album「Banquet」情報</h2>
            </div>
            {openBanquetInfo ? 
              <ChevronUp className="w-5 h-5 text-white/70" /> : 
              <ChevronDown className="w-5 h-5 text-white/70" />
            }
          </button>
          
          {openBanquetInfo && (
            <div className="space-y-4">
              {/* Calendar Image */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                <h3 className="text-white drop-shadow font-semibold mb-3 text-sm md:text-base">📅 リリーススケジュール</h3>
                <img 
                  src={banquetCalendar} 
                  alt="Banquet リリーススケジュール" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Album Details Image */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                <h3 className="text-white drop-shadow font-semibold mb-3 text-sm md:text-base">💿 商品詳細</h3>
                <img 
                  src={banquetInfo} 
                  alt="Banquet 商品詳細" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Serial Number Benefits Image */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30">
                <h3 className="text-white drop-shadow font-semibold mb-3 text-sm md:text-base">🎁 シリアルナンバー特典</h3>
                <img 
                  src={banquetSerial} 
                  alt="Banquet シリアルナンバー特典" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Note */}
              <div className="p-3 md:p-4 bg-purple-500/20 backdrop-blur-sm rounded-lg border border-purple-400/30">
                <p className="text-white drop-shadow text-xs md:text-sm">
                  <strong>📢 発売日：</strong>2026年4月8日（水）<br />
                  アルバム「Banquet」の応援もよろしくお願いします！
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-4 md:mt-6 text-center text-white drop-shadow text-sm md:text-base">
          <p>※ これは非公式のファンサポートサイトです</p>
          <p className="mt-1">キャンペーンの詳細は各サイトでご確認ください</p>
        </div>
      </div>
    </div>
  );
}