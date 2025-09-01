'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Calendar, MapPin, ExternalLink, Facebook, Building2, User, AlertTriangle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const HeroAnimation = () => {
  const seagullRef = useRef<HTMLImageElement>(null);
  const cloudRef = useRef<HTMLImageElement>(null);
  const waveRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Seagull pendulum animation
    const animateSeagull = () => {
      if (!seagullRef.current) return;
      const time = Date.now() / 1000;
      const swing = Math.sin(time) * 15;
      seagullRef.current.style.transform = `translateX(${swing}px) translateY(${Math.abs(swing/4)}px)`;
      requestAnimationFrame(animateSeagull);
    };

    // Cloud floating animation
    const animateCloud = () => {
      if (!cloudRef.current) return;
      const time = Date.now() / 2000;
      const float = Math.sin(time) * 10;
      cloudRef.current.style.transform = `translateX(${float/4}px) translateY(${float/2}px)`;
      requestAnimationFrame(animateCloud);
    };

// Wave animation
    const animateWave = () => {
      if (!waveRef.current) return;
      waveRef.current.animate([
        // フェードインと共に奥から始まる
        { opacity: 0, transform: 'scale(0.9) translateY(20px)' },
        // 完全に見えて手前に
        { opacity: 0.8, transform: 'scale(1) translateY(0px)' },
        // フェードアウトしながら更に手前に
        { opacity: 0, transform: 'scale(1.1) translateY(-20px)' }
      ], {
        duration: 3000,
        iterations: Infinity,
        easing: 'ease-in-out'
      });
    };

    // Start all animations
    const seagullAnimation = requestAnimationFrame(animateSeagull);
    const cloudAnimation = requestAnimationFrame(animateCloud);
    animateWave();

    // Cleanup
    return () => {
      cancelAnimationFrame(seagullAnimation);
      cancelAnimationFrame(cloudAnimation);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background image - static */}
      <img
        src="/bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        aria-hidden="true"
      />
      
      {/* Wave layer - animated */}
      <img
        ref={waveRef}
        src="/wave.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        aria-hidden="true"
      />
      
      {/* Cloud layer - animated */}
      <img
        ref={cloudRef}
        src="/cloud.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        aria-hidden="true"
      />
      
      {/* Seagull layer - animated */}
      <img
        ref={seagullRef}
        src="/seagull.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        aria-hidden="true"
      />

      {/* Top overlay - static */}
      <img
        src="/kamome_logo_padding.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain"
        aria-hidden="true"
      />
    </div>
  );
};


const HeroSection = () => {
  return (
    <div className="hero-section relative h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] overflow-hidden bg-white">
      <HeroAnimation />
    </div>
  );
};

const FloatingHeader = () => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setShowLogo(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-24"> {/* 高さを明示的に指定 */}
      <div className="bg-white shadow-md h-full">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl h-full">
          <div className={`w-48 h-20 transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kamome_logo_padding-VBJ3I4qnKZ8Fa7oZLYgwD1xvXWtFf8.png"
              alt="かもめ会議 2024 ロゴ"
              width={192}
              height={80}
              priority
            />
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:text-[#ffde59]">ABOUT</a></li>
              <li><a href="#timetable" className="hover:text-[#ffde59]">TIME TABLE</a></li>
              <li><a href="#registration" className="hover:text-[#ffde59]">参加申し込み</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const schedule = [
  { startTime: '9:30', endTime: '10:00', event: '受付開始', type: 'simple' },
  { startTime: '10:00', endTime: '10:15', event: 'オープニング', type: 'simple' },
  {
    startTime: '10:15',
    endTime: '11:30',
    event: '全体会',
    type: 'plenary',
    duration: '(75min.)',
    sessions: [
      {
        event: '全体会',
        title: '「横浜×挑戦」グロービス卒業生のトークセッション！！',
        description: '「横浜で踏み出す一歩」\n横浜で挑戦を続けるグロービス経営大学院の卒業生3名が登壇！挑戦の喜びと困難を、リアルな体験談とともに語り尽くす特別セッションです。\nグロービスで培った学びや人的ネットワークをどのように生かし、足りていない所をどう補い、乗り越えてきたのかを語ってもらいます。さらに多様な分野でのキャリアや挑戦の物語を通じて、参加者に、新たな視点と“一歩踏み出す勇気”を届け、皆様から大いなる横浜も語ってもらいます。',
        speakers: [
          { 
            name: '加藤 優子 さん (GMBA2019期)', 
            organization: 'コクヨアンドパートナーズ株式会社', 
            position: 'ベリーダンサー/インストラクター', 
            info: '',
            image: '/登壇者_0_1.jpg'
          },
          { 
            name: '根尾 暁子 さん (GMBA2022期)', 
            organization: '横浜ベイシェラトンホテル &タワーズ', 
            position: '収益管理部 宿泊レベニューマネージャー', 
            info: '',
            image: '/登壇者_0_2.jpg'
          },
          { 
            name: '中川 徹 さん (GMBA2015期)', 
            organization: '株式会社　高島屋', 
            position: '経営企画部　経営企画担当部長', 
            info: '',
            image: '/登壇者_0_3.jpg'
          },
          { 
            name: '得能 淳 さん (GMBA2017期)', 
            organization: 'グロービス経営大学院大学', 
            position: '特設キャンパス責任者(横浜・仙台・水戸)', 
            info: '',
            image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%85%A8%E4%BD%93%E4%BC%9A_%E5%BE%97%E8%83%BD%E3%81%95%E3%82%93-f8HrUSOJeeBOazuchJinl2O9pFiCyj.png'
          }
        ]
      }
    ]
  },
  { startTime: '11:30', endTime: '13:00', event: 'ランチブレイク /\nネットワーキング', type: 'simple' },
  {
    startTime: '13:00',
    endTime: '14:00',
    event: '分科会1',
    type: 'breakout',
    duration: '(60min.)',
    sessions: [
      {
        event: '分科会A',
        title: '非MBA人材アントレプレナーシップのリアル',
        description: 'ファウンダー（新しい組織・事業を作ってチャンスをとらえようとする個人）である参加者の皆様は、これから一歩を踏み出す際に、多くの意思決定を意図的に行う必要がある。そこには、いくつものジレンマが存在している。\n本セッションでは、企業で遺伝子解析の技術者として活躍後、起業された小野秀彰氏をお迎えし、Tec技術者が独学にてビジネスを学び、数々のジレンマをどのように乗り越えて今に至ったのか、参加者の皆様と共に掘り下げるセミナーを予定している。',
        speakers: [
          { 
            name: '小野 秀彰 さん', 
            organization: '株式会社日本食品遺伝科学', 
            position: '代表取締役社長', 
            info: '',
            image: ''
          }
        ]
      },
      {
        event: '分科会B',
        title: '「難民ゼロ」の社会課題を「環境負荷ゼロ」で解決する高難度のソーシャルビジネス経営者の挑戦',
        description: 'ソーシャルビジネスの先駆者ボーダレスジャパンから出資を受け、2017年から横浜で難民の自社雇用に挑むピープルポート。リユースPC事業を通じ「難民ゼロ」と「環境負荷ゼロ」を目指す独自モデルを展開。本講演では、その熱い想いと、理想と現実の狭間で揺れながらも挑戦を続けるソーシャルビジネスの裏側のリアルを、日々挑戦している青山さんと藤井さんから語っていただきます。',
        speakers: [
          { name: '藤井 優花 さん', 
           organization: 'ピープルポート株式会社', 
           position: '法人連携統括責任者', 
           info: '', 
           image: '/登壇者_B_1.jpg' },
          { name: '青山 明弘 さん', 
           organization: 'ピープルポート株式会社', 
           position: '代表取締役社長', 
           info: '', 
           image: '/登壇者_B_2.png' }
        ]
      }
    ]
  },
  { startTime: '14:00', endTime: '14:15', event: '休憩', type: 'simple' },
  {
    startTime: '14:15',
    endTime: '15:15',
    event: '分科会2',
    type: 'breakout',
    duration: '(60min.)',
    sessions: [
      {
        event: '分科会C',
        title: '学生時代の原体験から生まれた想いを生業に+ビジネスパーソン向けお身体チェック',
        description: '本セッションでは、医療従事者（鍼灸師）・トレーナーをされているBACK AGINGの和田有稀奈氏を迎えます。女子サッカー選手を志すも、5年間で3度膝の手術を経験し、満足いく現役時代を送れなかった経験から「挑戦を諦める人を減らしたい」と医療従事者（鍼灸師）となり、イタリア女子フットサル代表のトレーナー活動などを経て、現職に到ります。今回は、志の変遷についてのお話と合わせて、ビジネスパーソン向けのお身体チェックを行います！',
        speakers: [
          { 
            name: '和田 有稀奈 さん', 
            organization: 'BACK AGING', 
            position: '鍼灸師/トレーナー', 
            info: '',
            image: '/登壇者_C_1.webp'
          }
        ]
      },
      {
        event: '分科会D',
        title: '不屈のリーダーシップ',
        description: '本セッションでは、ALSの診断を受けつつ社会に価値を創出し続ける畠中一郎氏を迎えます。コンゴでの死の危機、ハーバードMBA、大手コンサル経験を経て「生きる意味」を追究。発症後は他者と社会のために尽力し、難病支援や共助モデル構築を推進。逆境下での意思決定や挑戦の視座を語ります。',
        speakers: [
          { 
            name: '畠中 一郎 さん', 
            organization: '一般財団法人すこやかさ ゆたかさの未来研究所', 
            position: '代表理事', 
            info: '',
            image: '/登壇者_D_1.png'
          }
        ]
      }
    ]
  },
  { startTime: '15:15', endTime: '15:30', event: '休憩', type: 'simple' },
  {
    startTime: '15:30',
    endTime: '16:30',
    event: '分科会3',
    type: 'breakout',
    duration: '(60min.)',
    sessions: [
      {
        event: '分科会E',
        title: '生成AIを今後の仕事に有効的に使っていくには？',
        description: '生成AIに関する様々な情報を発信しているIkigai lab.の髙橋さんをお招きして、生成AIの一丁目一番地をしっかりとさらってもらう45分にしたく思います。これを機会に基礎力を身に着けて、今後の実務に活かしていきましょう。講演を実りあるものにするため、参加者からの事前の質問を募集します。出来るだけ質問内容を答えながら話を進めるものにしたく思います。なお、時間の関係ですべての質問には回答できないことをご了承していただきたく思います。',
        speakers: [
          { 
            name: '髙橋　和馬 さん', 
            organization: 'Ikigai lab. ', 
            position: 'オーナー', 
            info: '',
            image: '/登壇者_E_1.jpg'
          }
        ]
      },

      {
        event: '分科会F',
        title: 'ROIC逆ツリーの生みの親が語る企業価値向上について',
        description: 'オムロンでROIC経営を推進し、独自の「ROIC逆ツリー」を創出した大上氏。理論の実践を愚直に重ねることにより、企業価値向上に取り組んできました。本セッションでは、ROIC経営を軸にした企業変革の実践と、その歩みが今のスタートアップ支援やエコシステムづくりへの想いにどうつながっているのかを語ります。',
        speakers: [
          { name: '大上 高充 さん', 
            organization: '元オムロン株式会社', 
            position: ' 執行役員 グローバル理財本部長',
            info: '中小機構 Science Tokyo 横浜ベンチャープラザ チーフインキュベーションマネージャ,同志社大学　ビジネス研究科 客員教授',
            image: '/登壇者_F_1.png'
          },
        ]
      }
    ]
  },
  { startTime: '16:30', endTime: '16:45', event: '休憩', type: 'simple' },
  { startTime: '16:45', endTime: '17:15', event: 'クロージング /\nディスカッション', type: 'simple' },
  { startTime: '18:00', endTime: '20:00', event: '懇親会\nハマかもナイト\n※希望者のみ', type: 'simple' },
  { startTime: '11月28日(金) 19:00', endTime: '21:00', event: 'アフターセッション\n※希望者のみ、別途案内', type: 'simple' }
];

type Speaker = {
  name: string;
  organization: string;
  position: string;
  info: string;
  image?: string;
};

type Session = {
  event: string;
  title: string;
  description: string;
  speakers: Speaker[];
  soldOut?: boolean;
};

type EventPopupProps = {
  session: Session;
  eventType: string;
  startTime: string;
  endTime: string;
  duration?: string;
};

const EventPopup: React.FC<EventPopupProps> = ({ session, eventType, startTime, endTime, duration }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative h-full">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${eventType === 'plenary' ? 'bg-[#ffde59] text-[#545454]' : 'bg-[#ffde59] text-[#545454]'}`}>
            {session.event}
          </span>
          {session.soldOut && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              満員御礼
            </span>
          )}
          <h3 className="text-xl font-bold mb-2 break-words whitespace-pre-line">{session.title}</h3>
          <p className="text-sm text-gray-600">{session.speakers.map(speaker => speaker.name).join(' / ')}</p>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-[#79a7b6] rounded-br-lg"></div>
          <ExternalLink className="absolute bottom-[5px] right-[5px] w-3.5 h-3.5 text-white z-10" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="mb-4 text-[#545454]">
            <span className="text-xl font-bold">{startTime}-{endTime}</span>
            {duration && <span className="text-sm ml-2">{duration}</span>}
            <br />
            <span className="inline-block px-3 py-1 bg-[#ffde59] text-[#545454] rounded-full text-sm font-semibold mt-2">{session.event}</span>
          </div>
        </DialogHeader>
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <DialogTitle className="text-xl font-bold mb-4 whitespace-pre-line">{session.title}</DialogTitle>
          {session.soldOut && (
            <p className="mb-4 text-red-500 font-bold">
              ※ こちらの分科会は満員につき締切となりました。ご了承ください。
            </p>
          )}
          <p className="mb-4 whitespace-pre-line">{session.description}</p>
          <div className="space-y-2">
            {session.speakers.map((speaker, speakerIndex) => (
              <div key={speakerIndex} className="flex items-center bg-[#79a7b6] text-white p-2 rounded-lg">
                <Image
                  src={speaker.image || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kagome_symbol_circle-nXt3WkJj062REZ1jLWrRPFtFhsiiIG.png"}
                  alt={speaker.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <div>
                  <p className="font-bold text-sm">{speaker.name}</p>
                  <p className="text-xs">{speaker.organization}</p>
                  <p className="text-xs">{speaker.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#79a7b6] text-[#545454] font-sans">
      <FloatingHeader />
      <main className="mt-16 sm:mt-24">
        <HeroSection />
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">ABOUT</h2>
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-[#79a7b6] text-center mb-6">
                参加者全員が1歩踏み出すきっかけを、ヨコハマから
              </h3>
            </div>
            <p className="text-lg mb-6">
              かもめ会議とはグロービス経営大学院の公認クラブであるグロービス横浜活性化クラブ(GYAC)が主催する、単科生・本科生・卒業生のためのビジネスカンファレンスです。
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>起業家精神の真髄に触れる：</strong> 横浜ゆかりの起業家たちが、失敗を恐れず挑戦する勇気をリアルな体験とともに伝授。</li>
              <li><strong>社会課題へのアプローチを学ぶ：</strong> 未病対策やサーキュラーエコノミーなど、今注目の分野で活躍する実務者から最前線の取り組みを聞く。</li>
              <li><strong>未来を創る仲間と出会う：</strong> 「ヨコハマ未来創造会議」のような、次世代を担う若者たちの斬新な発想に触れ、刺激を得る。</li>
              <li><strong>意外なキャリアの可能性を発見：</strong> 宇宙ビジネスやフードテック、地方創生など、思わぬところにあなたのスキルが活きるチャンスが。</li>
            </ul>
            <p className="text-lg">
              堅苦しさは一切なし。肩の力を抜いて参加できる、でも中身は本気の1日。「自分も何かできるかも」そんな小さな思いが、大きな一歩につながる瞬間を、ぜひ体感してください。
            </p>
          </div>
        </section>

        <section id="timetable" className="py-20 bg-[#f4f4f4]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">TIME TABLE</h2>
            <div className="space-y-4 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>
              {schedule.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-xl font-bold">{item.startTime}-{item.endTime}</span>
                      {item.duration && <p className="text-sm text-gray-600">{item.duration}</p>}
                    </div>
                    <span className={`text-lg ${['全体会', '分科会1', '分科会2', '分科会3'].includes(item.event) ? 'bg-[#ff8383] text-white px-2 py-1 rounded-full' : ''}`}>
                      {item.event.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </span>
                  </div>
                  {item.type === 'plenary' || item.type === 'breakout' ? (
                    <div className={`mt-4 ${item.type === 'plenary' ? 'grid-cols-1' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
                      {item.sessions?.map((session, sessionIndex) => (
                        <div key={sessionIndex} className="mb-4 h-full">
                          <EventPopup 
                            session={session} 
                            eventType={item.type} 
                            startTime={item.startTime}
                            endTime={item.endTime}
                            duration={item.duration}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="registration" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">参加申し込み</h2>
            <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4">申し込み状況</h3>
              {/*販売中のメッセージ*/}
              <div className="bg-green-100 text-black-700 p-4 mb-6 rounded-lg">
                <p className="font-bold flex items-center">
                  <AlertTriangle className="mr-2" />
                  チケット販売中
                </p>
                <p>チケット販売中です。</p>
                <p>かもめ会議2025。</p>
                <p>奮ってご参加ください。</p>
                
              {/*完売したときのメッセージ
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
                <p className="font-bold flex items-center">
                  <AlertTriangle className="mr-2" />
                  チケット完売のお知らせ
                </p>
                <p>多数のお申し込みをいただき誠にありがとうございます。</p>
                <p>かもめ会議2024は全席完売となりました。</p>
                <p>次回の開催をご期待ください。</p>
                */}

                
              </div>

              <h4 className="text-lg font-bold mb-2">購入済みチケットについて</h4>
              <p className="mb-4">受付完了後のキャンセル・返金はできません。ただし、チケットの譲渡は可能です。 </p>
              <p className="mb-4">譲渡する際はPeatixのシステム上で譲渡の申請をお願いします。</p>
              <p className="mb-4">尚、当事者間の譲渡に関しては運営事務局は一切の責任を負いかねます。</p>

              <h4 className="text-lg font-bold mb-2">お問い合わせ</h4>
              <p className="mb-1">かもめ会議運営事務局</p>
              <p className="mb-4">
                <a href="mailto:kamome_2025.stu@globis.ac.jp" className="text-blue-600 hover:underline">
                  kamome_2025.stu@globis.ac.jp
                </a>
              </p>

              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
             
               <a href="https://kamome2025.peatix.com/view" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="bg-yellow-400 text-black font-bold px-4 py-2 rounded /*cursor-not-allowed*/" 
                 /*disabled*/>
                  チケット購入
               </a>               
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeKIasjZPpoIlYq2WN3De7ssXqOdVOD-svUVQF_ZdZkbeNbSA/viewform" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="bg-yellow-400 text-black font-bold px-4 py-2 rounded /*cursor-not-allowed*/" 
                 /*disabled*/>
                  セッション申込
               </a>
              </div>
            </div>
          </div>
          </section>

        <section className="py-20 bg-[#f4f4f4]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">開催概要</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="mr-2" />
                  開催日時
                </h3>
                <p className="mb-2">2025年10月19日（日）</p>
                <p>10:00-17:15 (受付開始 09:30)</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Building2 className="mr-2" />
                  会場
                </h3>
                <p className="mb-2">グロービス経営大学院　横浜・特設キャンパス</p>
                <p>〒220-0005　神奈川県横浜市西区南幸1-1-1 JR横浜タワー14F</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <MapPin className="mr-2" />
                  アクセス
                </h3>
                <p className="mb-2">JR横浜駅 北改札口、きた西口出口を出て左／徒歩5分</p>
                <p className="mb-2">JR横浜タワー内に14Fへの直通エレベーターはございませんので、12Fで13-21F行きエレベーターまたはエスカレーターにお乗り換えいただき、14Fまでお越しください。</p>
                <a href="https://mba.globis.ac.jp/campus/yokohama/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  詳細なアクセス情報はこちら
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <User className="mr-2" />
                  主催
                </h3>
                <p className="mb-2">グロービス横浜活性化クラブ(GYAC)</p>
                <a href="https://www.facebook.com/groups/gyac.yokohama" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Facebook className="w-6 h-6 text-[#545454] hover:text-[#ffde59]" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#545454] text-white py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <p>
              お問い合わせ: <a href="mailto:kamome_2025.stu@globis.ac.jp" className="hover:underline">kamome_2025.stu@globis.ac.jp</a>
            </p>
            <p className="mt-4">&copy; 2025 かもめ会議. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
