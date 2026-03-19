import { useState, useEffect } from "react";
import { TodoItem, Todo } from "./components/TodoItem";
import { AddTodoForm } from "./components/AddTodoForm";
import { CheckCircle2, Clock, Sparkles, Music2, ExternalLink, Gift, ShoppingCart } from "lucide-react";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";

const musicServices = [
  {
    name: "iTunes",
    icon: "🍎",
    purchaseUrl: "https://music.apple.com/jp/album/be-first-all-day-single/1876143315",
    campaignUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeEk5xnxMFPe3WDdAoyLcVQ0lH5kWXDHzKc4Ap-mtXeNakhlw/viewform",
    color: "from-pink-500 to-rose-500"
  },
  {
    name: "レコチョク",
    icon: "🎵",
    purchaseUrl: "https://recochoku.jp/song/S1029810629",
    campaignUrl: "https://docs.google.com/forms/d/e/1FAIpQLSegGjuKJppLdrt0kwXs-jGfKnrHTct68A26Kn8YzNrCLlKN8A/viewform",
    color: "from-orange-500 to-red-500"
  },
  {
    name: "うたギフト",
    icon: "🎁",
    campaignUrl: "https://recochoku.jp/special/101059/",
    color: "from-yellow-500 to-orange-500"
  },
  {
    name: "mora",
    icon: "🎧",
    purchaseUrl: "https://mora.jp/package/43000002/ANTCD-A0000019112/",
    campaignUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfUWtJ4Dn-QcpPHJ8QLtAVcfrCxOgWKCGea-vyDFlj-e-56kA/viewform",
    color: "from-blue-500 to-indigo-500"
  },
  {
    name: "Amazon Music",
    icon: "🛒",
    purchaseUrl: "https://www.amazon.co.jp/music/player/albums/B0GN3PCVPY",
    color: "from-cyan-500 to-blue-500"
  },
  {
    name: "mu-mo",
    icon: "🎶",
    purchaseUrl: "https://sp-m.mu-mo.net/music/12196708/",
    campaignUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdoRb2x3wwyuCwxpNWV2IWlWsfwiQf9X7pyo5gpwinml_NP9A/viewform",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "dミュージック",
    icon: "📱",
    purchaseUrl: "https://dmusic.docomo.ne.jp/song/S1029810629",
    campaignUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfE4ezCv6ZtzOaHyRuXQJSdjNhsTfUOqJUZfJTy72kvr_hITA/viewform",
    color: "from-red-500 to-pink-500"
  }
];

interface PurchaseChecklist {
  [key: string]: {
    purchased: boolean;
    campaigned: boolean;
  };
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("befirst-todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [purchaseChecklist, setPurchaseChecklist] = useState<PurchaseChecklist>(() => {
    const saved = localStorage.getItem("befirst-purchase-checklist");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("befirst-todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("befirst-purchase-checklist", JSON.stringify(purchaseChecklist));
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

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="size-8 text-cyan-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              BE:FIRST
            </h1>
            <Sparkles className="size-8 text-purple-400 animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Music2 className="size-6 text-cyan-400" />
            <p className="text-3xl md:text-4xl font-bold text-white">ALL DAY</p>
          </div>
          <p className="text-cyan-300 font-semibold mb-2">配信中！🎉</p>
          <p className="text-gray-400 text-sm">チャート入りを目指してファンができること</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* 総合リンクセクション */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border-2 border-cyan-400/50">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Music2 className="size-8 text-cyan-400" />
                  <h2 className="text-3xl font-bold text-white">配信サイト一覧</h2>
                  <Music2 className="size-8 text-cyan-400" />
                </div>
                <p className="text-gray-300 mb-6">
                  各種配信サービスへのリンクはこちらから
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://befirst.lnk.to/BEFIRSTALLDAY?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGndyC0goJbZ5m9Beb4cRJJmXM89WLLzDDuH6V8eCIObMImXajv2pR5z-xNbZk_aem_CQOfhO22OhWhFr3y8n63OA', '_blank')}
                >
                  <ExternalLink className="size-5 mr-2" />
                  ALL DAY 配信サイト一覧を開く
                  <ExternalLink className="size-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* 購入リンクセクション */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="size-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">購入リンク</h2>
            </div>
            <div className="space-y-3">
              {musicServices.map((service) => (
                <div
                  key={service.name}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{service.icon}</span>
                      <div>
                        <h3 className="text-white font-bold">{service.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {service.purchaseUrl && (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={purchaseChecklist[service.name]?.purchased || false}
                          onCheckedChange={() => togglePurchase(service.name)}
                          id={`purchase-${service.name}`}
                          className="border-cyan-400/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                        />
                        <Button
                          className={`flex-1 bg-gradient-to-r ${service.color} hover:opacity-90 text-white font-semibold`}
                          onClick={() => window.open(service.purchaseUrl, '_blank')}
                        >
                          <ShoppingCart className="size-4 mr-2" />
                          購入する
                          <ExternalLink className="size-4 ml-2" />
                        </Button>
                      </div>
                    )}
                    {service.campaignUrl && (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={purchaseChecklist[service.name]?.campaigned || false}
                          onCheckedChange={() => toggleCampaign(service.name)}
                          id={`campaign-${service.name}`}
                          className="border-cyan-400/50 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                        />
                        <Button
                          variant="outline"
                          className="flex-1 border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20"
                          onClick={() => window.open(service.campaignUrl, '_blank')}
                        >
                          <Gift className="size-4 mr-2" />
                          キャンペーン応募
                          <ExternalLink className="size-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
              <p className="text-cyan-300 text-sm font-semibold mb-2">💡 購入のポイント</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• 複数のサービスで購入すると各チャートに貢献できます</li>
                <li>• レコチョクなどキャンペーン応募も忘れずに！</li>
                <li>• 購入後はSNSでシェアしよう</li>
              </ul>
            </div>
          </div>

          {/* やることリストセクション */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white">やることリスト</h2>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-400" />
                  <span className="text-white font-bold">
                    {completedCount} / {totalCount}
                  </span>
                </div>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mb-4">
              <AddTodoForm onAdd={addTodo} />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {todos.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p className="mb-4">やることを追加しよう！</p>
                  <div className="text-left text-sm space-y-1">
                    <p className="text-gray-500">例：</p>
                    <p>• iTunesで購入する</p>
                    <p>• レコチョクのキャンペーンに応募する</p>
                    <p>• SNSでシェアする</p>
                  </div>
                </div>
              ) : (
                todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </div>

            {totalCount > 0 && completedCount === totalCount && (
              <div className="mt-4 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30 text-center">
                <p className="text-cyan-300 font-bold text-lg">
                  🎉 すべて完了！素晴らしい応援！
                </p>
              </div>
            )}
          </div>
        </div>

        {/* その他の応援方法 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="size-6 text-purple-400" />
            その他の応援方法
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-cyan-300 font-bold mb-2">📱 SNSでシェア</h3>
              <p className="text-gray-300 text-sm">
                Twitter、Instagram、TikTokなどで「#BEFIRST」「#ALLDAY」をつけて投稿
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-cyan-300 font-bold mb-2">🎧 ストリーミング</h3>
              <p className="text-gray-300 text-sm">
                Spotify、Apple Music、YouTube Musicなどで繰り返し再生
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-cyan-300 font-bold mb-2">📺 MVを視聴</h3>
              <p className="text-gray-300 text-sm">
                YouTubeでミュージックビデオを視聴・高評価・コメント
              </p>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>BE:FIRST ALL DAY - みんなで応援してチャート入りを目指そう！🎵</p>
        </div>
      </div>
    </div>
  );
}