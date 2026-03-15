
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
import { 
  Diamond, 
  Camera, 
  ShoppingBag, 
  Gift,
  Loader2,
  X,
  Sparkles,
  Settings,
  MapPin,
  Mic,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  Shirt,
  ShieldCheck,
  Zap,
  Moon,
  Volume2,
  VolumeX,
  Navigation,
  PhoneCall,
  Search,
  Check,
  User,
  LogOut,
  Save,
  History,
  Mail,
  Users,
  Send,
  Upload,
  Image as ImageIcon,
  Wand2
} from 'lucide-react';
import { JEWELRY_PRODUCTS, STORE_LOCATIONS } from './constants';
import { Category, Product, UserProfile, SavedSnapshot, TryOnHistoryItem, CustomerRecord } from './types';
import { 
  generateGreetingMessage, 
  performAITryOn, 
  generateGreetingCard, 
  generateGreetingAudio,
  recommendJewelry,
  changeOutfit,
  editProductImage,
  GreetingData
} from './services/geminiService';

const DRESS_OPTIONS = [
  { id: 'saree', name: 'Silk Saree', prompt: 'Modern Designer Red Banarasi Saree with gold Zari borders, traditional Indian look' },
  { id: 'gown', name: 'Evening Gown', prompt: 'Luxury floor-length velvet evening gown in navy blue, western formal style' },
  { id: 'lehenga', name: 'Bridal Lehenga', prompt: 'Heavy Intricate Designer Lehenga in maroon, royal bridal aesthetic' },
  { id: 'formal', name: 'Formal Suit', prompt: 'Tailored designer power suit in charcoal gray with a silk shirt' },
];

const getBase64FromUrl = async (url: string): Promise<string> => {
  try {
    let base64String = "";
    if (url.startsWith('http')) {
      const response = await fetch(`https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      base64String = data.base64;
    } else {
      const response = await fetch(url);
      const blob = await response.blob();
      base64String = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    }
    // IMPORTANT: Remove the "data:image/...;base64," part
    return base64String.replace(/^data:image\/\w+;base64,/, "");
  } catch (e) {
    console.error("Base64 Error:", e);
    return "";
  }
};

const Navbar = ({ user, onLogout }: { user: UserProfile | null, onLogout: () => void }) => (
  <nav className="sticky top-0 z-50 bg-white border-b border-stone-100 px-6 py-4 flex justify-between items-center shadow-sm">
    <Link to="/" className="flex items-center group">
      <img 
        src="/zoya_logo.webp" 
        alt="zoya Logo" 
        className="h-10 w-auto object-contain transition-transform hover:scale-105"
      />
    </Link>
    <div className="hidden md:flex gap-10 text-[11px] font-bold text-stone-600 uppercase tracking-[0.15em]">
      <Link to="/" className="hover:text-Zoya-maroon transition relative py-1">Collections</Link>
      <Link to="/greetings" className="hover:text-Zoya-maroon transition relative py-1">AI Gifting</Link>
      <Link to="/stores" className="hover:text-Zoya-maroon transition relative py-1">Stores</Link>
      {user?.role === 'admin' && (
        <Link to="/admin" className="hover:text-Zoya-maroon transition flex items-center gap-1 text-Zoya-gold">
          <Settings className="w-3 h-3"/> Staff Portal
        </Link>
      )}
    </div>
    <div className="flex gap-6 items-center">
      {user ? (
        <div className="flex items-center gap-4">
          <Link to="/profile" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-600 hover:text-Zoya-maroon">
            <User className="w-4 h-4" /> {user.name}
          </Link>
          <button onClick={onLogout} className="text-stone-400 hover:text-red-600 transition">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest text-Zoya-maroon border border-Zoya-maroon px-4 py-2 hover:bg-Zoya-maroon hover:text-white transition">Login</Link>
      )}
      <ShoppingBag className="w-5 h-5 text-Zoya-maroon cursor-pointer hover:scale-110 transition" />
    </div>
  </nav>
);

const LoginPage = ({ onLogin }: { onLogin: (user: UserProfile) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@rlai.com' && password === 'admin123') {
      onLogin({ id: 'admin-1', email, name: 'Admin Staff', role: 'admin' });
      navigate('/admin');
    } else {
      onLogin({ id: 'user-' + Date.now(), email, name: email.split('@')[0], role: 'user' });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] p-6">
      <div className="bg-white p-12 shadow-2xl w-full max-w-md border border-stone-100 text-center">
        <Diamond className="w-12 h-12 text-Zoya-maroon mx-auto mb-8" />
        <h2 className="text-3xl font-serif mb-10 text-Zoya-maroon uppercase tracking-widest">Zoya Member Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="email" placeholder="EMAIL ADDRESS" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-4 bg-stone-50 border-b border-stone-200 outline-none focus:border-Zoya-gold text-center tracking-widest font-medium" />
          <input type="password" placeholder="PASSWORD" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-4 bg-stone-50 border-b border-stone-200 outline-none focus:border-Zoya-gold text-center tracking-widest font-medium" />
          <button type="submit" className="w-full bg-Zoya-maroon text-white py-5 text-[10px] uppercase font-bold tracking-[0.4em] shadow-xl hover:bg-[#4a0d16] transition">Enter Studio</button>
        </form>
        <p className="mt-8 text-[9px] text-stone-400 uppercase tracking-widest">Forgot your password? Contact Boutique Support.</p>
      </div>
    </div>
  );
};


const ProductGallery = ({ products }: { products: Product[] }) => {
  const navigate = useNavigate();
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <span className="text-Zoya-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Pure Gold & Diamonds</span>
        <h1 className="text-5xl md:text-7xl font-serif mb-8 text-Zoya-maroon">Curated Showcase</h1>
        <div className="w-32 h-[1.5px] bg-Zoya-gold mx-auto mb-10"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16">
        {products.map((p) => (
          <div key={p.id} className="group cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <button className="w-full bg-white/90 backdrop-blur py-4 text-[10px] font-bold uppercase tracking-widest text-Zoya-maroon shadow-lg">View Details</button>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-Zoya-gold font-bold mb-2">{p.category}</p>
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-stone-800 mb-2">{p.name}</h3>
              <p className="text-Zoya-maroon font-serif text-lg">₹{p.price.toLocaleString('en-IN')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VirtualTryOn = ({ products, user }: { products: Product[], user: any }) => {
  const DRESS_OPTIONS = [
    { id: 'ethnic', name: 'Traditional Saree', prompt: 'wearing a luxury traditional silk saree' },
    { id: 'western', name: 'Evening Gown', prompt: 'wearing an elegant black evening gown' },
    { id: 'bridal', name: 'Bridal Lehenga', prompt: 'wearing a heavy designer bridal lehenga' }
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const productId = location.pathname.split('/').pop();
  const [activeProduct, setActiveProduct] = useState<Product | undefined>(products.find(p => p.id === productId) || products[0]);

  const [image, setImage] = useState<string | null>(null); // User's Photo
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const getBase64FromUrl = async (url: string): Promise<string> => {
    try {
      let base64 = "";
      if (url.startsWith('http')) {
        const response = await fetch(`https://virtual-try-backend-bgtk.onrender.com/api/proxy-image?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        base64 = data.base64;
      } else {
        const response = await fetch(url);
        const blob = await response.blob();
        base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }
      return base64.replace(/^data:image\/\w+;base64,/, "");
    } catch (e) {
      console.error("Base64 Error:", e);
      return "";
    }
  };

//   const runTryOn = async (dressPrompt: string = "Original Photo") => {
//     if (!image || !activeProduct) return;

//     setLoading(true);
//     setStatus('Analyzing Neckline & Jewel Geometry...');

//     try {
//       const jBaseRaw = await getBase64FromUrl(activeProduct.image);
//       const uBaseRaw = image.replace(/^data:image\/\w+;base64,/, "");

//       const categoryMap: Record<string, string> = {
//         [Category.NECKLACE]: 'necklaces',
//         [Category.EARRINGS]: 'earrings',
//         [Category.RING]: 'rings',
//         [Category.BRACELET]: 'bracelets'
//       };

//       const payload = {
//         model_photo: uBaseRaw,
//         clothing_photo: jBaseRaw,
//         category: categoryMap[activeProduct.category] || 'necklaces',
//         attire: dressPrompt,
//         auto_size: true
//       };

//       const response = await fetch('https://virtual-try-backend-bgtk.onrender.com/api/try-on', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       console.log("Full AI Response:", data); // Isse debug hoga ki data kahan hai

// // Check karein ki image kahan hai (Thenewblack API structure ke hisaab se)
// const finalImg = data.image || data.image_url || data.response?.image;

// if (finalImg) {
//     setResult(finalImg.startsWith('https') ? finalImg : `data:image/png;base64,${finalImg}`);
//       } else if (data.details?.status === "NOT_RUN") {
//         alert("AI Error: Neckline not detected. Please upload a photo with a visible neck and ensure the jewelry image is clear.");
//       } else {
//         alert(data.error || "AI Atelier is busy. Please try again.");
//       }
//     } catch (e: any) {
//       console.error("Fetch Error:", e);
//       alert("Connection Error. Please check your internet.");
//     } finally {
//       setLoading(false);
//     }
//   };



const runTryOn = async (dressPrompt: string = "Original Photo") => {
    if (!image || !activeProduct) return;

    setLoading(true);
    setResult(null); 
    setStatus('Analyzing Neckline & Jewel Geometry...');

    try {
        const jBaseRaw = await getBase64FromUrl(activeProduct.image);
        const uBaseRaw = image; 

        const payload = {
            model_photo: uBaseRaw,
            clothing_photo: jBaseRaw,
            category: activeProduct.category?.toLowerCase() || 'necklaces',
            attire: dressPrompt
        };

        const response = await fetch('https://virtual-try-backend-bgtk.onrender.com/api/try-on', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log("Full AI Response:", data);

        // FIX: Agar data direct string hai (URL), toh wahi hamari image hai
        let finalImg = null;
        if (typeof data === 'string') {
            finalImg = data;
        } else {
            finalImg = data.image || data.image_url || data.response?.image;
        }

        if (finalImg) {
            console.log("Setting Result to:", finalImg);
            setResult(finalImg); // String URL seedha set ho jayega
        } else {
            alert("AI Error: Response format not recognized.");
        }
    } catch (e) {
        console.error("Fetch Error:", e);
        alert("Connection Error.");
    } finally {
        setLoading(false);
    }
};

  const saveSnapshot = () => {
    if (!result || !user) {
      if (!user) navigate('/login');
      return;
    }
    const saved = JSON.parse(localStorage.getItem('saved_snapshots') || '[]');
    saved.push({ id: Date.now().toString(), userId: user.id, imageUrl: result });
    localStorage.setItem('saved_snapshots', JSON.stringify(saved));
    alert("Snapshot saved to your Studio!");
  };

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* LEFT SIDE: Preview Area */}
        <div className="lg:col-span-7 bg-white shadow-2xl relative aspect-[4/5] overflow-hidden rounded-sm">
          {result ? (
            <img src={result} className="w-full h-full object-cover animate-in fade-in duration-1000" />
          ) : image ? (
            <img src={image} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-stone-300 gap-10 bg-stone-50">
              <Camera className="w-24 h-24 opacity-10" />
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="bg-Zoya-maroon text-white px-12 py-5 text-[10px] uppercase font-bold tracking-[0.25em] cursor-pointer hover:bg-stone-900 transition">
                  Upload Portrait
                  <input type="file" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { 
                      const r = new FileReader(); 
                      r.onload = () => {
                        setImage(r.result as string);
                        setResult(null); // Reset previous result
                      };
                      r.readAsDataURL(f); 
                    }
                  }} />
                </label>
              </div>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 bg-[#1a080a]/90 flex flex-col items-center justify-center text-white z-50">
              <Loader2 className="w-16 h-16 animate-spin text-Zoya-gold mb-4" />
              <h2 className="text-2xl font-serif tracking-widest uppercase">{status}</h2>
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Controls Area */}
        <div className="lg:col-span-5">
          <div className="bg-white p-8 border border-stone-100 shadow-sm">
            <h2 className="text-3xl font-serif text-Zoya-maroon">{activeProduct?.name}</h2>
            
            <div className="my-6 p-4 bg-stone-50 border border-dashed border-stone-200">
              <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Selected Piece</p>
              <img src={activeProduct?.image} alt="Selected" className="h-32 mx-auto object-contain" />
            </div>

            {!result && image && !loading && (
               <button 
                 onClick={() => runTryOn("Original Photo")} 
                 className="w-full bg-Zoya-maroon text-white py-4 uppercase font-bold tracking-widest hover:bg-stone-900 transition shadow-lg flex items-center justify-center gap-2"
               >
                 <Sparkles size={18} /> Start Virtual Try-On
               </button>
            )}

            {result && !loading && (
              <div className="space-y-6">
                <button onClick={saveSnapshot} className="w-full flex items-center justify-center gap-2 bg-Zoya-gold text-white py-4 uppercase font-bold tracking-widest shadow-md">
                  <Save size={18} /> Save Snapshot
                </button>
                
                <div className="mt-6 space-y-3 border-t pt-6">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Style with Ensemble</p>
                  {DRESS_OPTIONS.map(o => (
                    <button 
                      key={o.id} 
                      onClick={() => runTryOn(o.prompt)} 
                      className="w-full p-4 bg-stone-50 border border-stone-100 text-[10px] font-bold uppercase tracking-widest hover:border-Zoya-maroon transition text-left flex justify-between items-center"
                    >
                      See in {o.name}
                      <Sparkles size={12} className="text-Zoya-gold" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


const ProfilePage = ({ user }: { user: UserProfile | null }) => {
  const [history, setHistory] = useState<TryOnHistoryItem[]>([]);
  const [snapshots, setSnapshots] = useState<SavedSnapshot[]>([]);

  useEffect(() => {
    if (user) {
      const h = JSON.parse(localStorage.getItem('tryon_history') || '[]');
      const s = JSON.parse(localStorage.getItem('saved_snapshots') || '[]');
      setHistory(h.filter((item: any) => item.userId === user.id));
      setSnapshots(s.filter((item: any) => item.userId === user.id));
    }
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-serif text-Zoya-maroon mb-4">Welcome, {user.name}</h1>
        <p className="text-stone-400 uppercase tracking-widest text-[10px]">Your Personal Zoya Studio</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-2xl font-serif mb-8 flex items-center gap-3"><Save className="w-5 h-5 text-Zoya-gold" /> Saved Snapshots</h2>
          <div className="grid grid-cols-2 gap-6">
            {snapshots.map(s => (
              <div key={s.id} className="bg-white p-4 border border-stone-100 shadow-sm">
                <img src={s.imageUrl} className="aspect-square object-cover mb-4" />
                <p className="text-[10px] font-bold uppercase tracking-widest truncate">{s.productName}</p>
                <p className="text-[9px] text-stone-400">{new Date(s.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
            {snapshots.length === 0 && <p className="text-stone-400 italic">No snapshots saved yet.</p>}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-serif mb-8 flex items-center gap-3"><History className="w-5 h-5 text-Zoya-gold" /> Try-On History</h2>
          <div className="space-y-6">
            {history.slice(0, 5).map(h => (
              <div key={h.id} className="flex gap-4 bg-white p-4 border border-stone-100 items-center">
                <img src={h.resultImage} className="w-20 h-20 object-cover" />
                <div>
                  <p className="font-bold uppercase tracking-widest text-[10px]">{h.productName}</p>
                  <p className="text-[9px] text-stone-400">{new Date(h.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {history.length === 0 && <p className="text-stone-400 italic">Try on some jewelry to see history!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ products, onUpdateProducts }: { products: Product[], onUpdateProducts: (p: Product[]) => void }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'bulk'>('inventory');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({ category: Category.NECKLACE, image: '' });
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [sendingStatus, setSendingStatus] = useState<string | null>(null);
  
  // AI Image Editing State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiEditing, setIsAiEditing] = useState(false);

  useEffect(() => {
    setCustomers([
      { id: '1', name: 'Ananya Sharma', phone: '+919876543210', gender: 'Female', event: 'Birthday', relation: 'Sister', tone: 'Elegant' },
      { id: '2', name: 'Rahul Verma', phone: '+919988776655', gender: 'Male', event: 'Anniversary', relation: 'Husband', tone: 'Emotional' },
      { id: '3', name: 'Priya Iyer', phone: '+919123456789', gender: 'Female', event: 'Generic', relation: 'Best Friend', tone: 'Casual' },
    ]);
  }, []);

  const handleSaveProduct = () => {
    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
      onUpdateProducts(updated);
      setEditingProduct(null);
    } else {
      const fullNew: Product = {
        ...newProduct as Product,
        id: 't-' + Date.now(),
        price: Number(newProduct.price) || 0,
        image: newProduct.image || 'https://via.placeholder.com/800x1200?text=Zoya+Masterpiece'
      };
      onUpdateProducts([...products, fullNew]);
      setNewProduct({ category: Category.NECKLACE, image: '' });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this Zoya masterpiece?")) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        if (editingProduct) setEditingProduct({...editingProduct, image: base64});
        else setNewProduct({...newProduct, image: base64});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiEdit = async () => {
    const targetImage = editingProduct ? editingProduct.image : newProduct.image;
    if (!targetImage || !aiPrompt) return;
    
    setIsAiEditing(true);
    try {
      const result = await editProductImage(targetImage, aiPrompt);
      if (result) {
        if (editingProduct) setEditingProduct({...editingProduct, image: result});
        else setNewProduct({...newProduct, image: result});
        setAiPrompt('');
      }
    } catch (e) {
      alert("AI Studio is busy enhancing the jewels. Please try again.");
    } finally {
      setIsAiEditing(false);
    }
  };

  const handleBulkSend = async () => {
    if (selectedCustomers.length === 0 || !selectedProductId) {
      alert("Please select customers and a jewelry piece.");
      return;
    }
    setSendingStatus('Orchestrating Zoya Luxury Campaign...');
    // Simulate sending
    await new Promise(r => setTimeout(r, 2000));
    alert(`Successfully sent greetings to ${selectedCustomers.length} customers!`);
    setSendingStatus(null);
    setSelectedCustomers([]);
  };

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-16 border-b border-stone-200 pb-8">
        <div>
          <h1 className="text-6xl font-serif text-Zoya-maroon">Staff Portal</h1>
          <p className="text-stone-400 tracking-[0.4em] uppercase text-[10px] mt-2">Boutique Management System</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('inventory')} className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest ${activeTab === 'inventory' ? 'bg-Zoya-maroon text-white' : 'text-stone-400'}`}>
            Inventory
          </button>
          <button onClick={() => setActiveTab('bulk')} className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest ${activeTab === 'bulk' ? 'bg-Zoya-maroon text-white' : 'text-stone-400'}`}>
            Bulk Greetings
          </button>
        </div>
      </div>

      {activeTab === 'inventory' ? (
        <div className="space-y-12">
          <div className="bg-stone-50 p-12 border border-stone-100 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-serif mb-8 text-Zoya-maroon uppercase tracking-widest">{editingProduct ? 'Update Masterpiece' : 'Design New Creation'}</h2>
              <div className="space-y-6">
                <input placeholder="PRODUCT NAME" value={editingProduct ? editingProduct.name : newProduct.name || ''} onChange={e => editingProduct ? setEditingProduct({...editingProduct, name: e.target.value}) : setNewProduct({...newProduct, name: e.target.value})} className="w-full p-4 border text-[10px] font-bold uppercase tracking-widest outline-none focus:border-Zoya-gold" />
                <input placeholder="PRICE (₹)" type="number" value={editingProduct ? editingProduct.price : newProduct.price || ''} onChange={e => editingProduct ? setEditingProduct({...editingProduct, price: Number(e.target.value)}) : setNewProduct({...newProduct, price: Number(e.target.value)})} className="w-full p-4 border text-[10px] font-bold uppercase tracking-widest outline-none focus:border-Zoya-gold" />
                <select value={editingProduct ? editingProduct.category : newProduct.category} onChange={e => editingProduct ? setEditingProduct({...editingProduct, category: e.target.value as Category}) : setNewProduct({...newProduct, category: e.target.value as Category})} className="w-full p-4 border text-[10px] font-bold uppercase tracking-widest bg-white outline-none">
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <textarea placeholder="STORY / DESCRIPTION" className="w-full p-4 border text-[10px] font-bold uppercase tracking-widest h-32 outline-none focus:border-Zoya-gold" value={editingProduct ? editingProduct.description : newProduct.description || ''} onChange={e => editingProduct ? setEditingProduct({...editingProduct, description: e.target.value}) : setNewProduct({...newProduct, description: e.target.value})} />
                
                <div className="pt-6 border-t border-stone-100 flex gap-4">
                  <button onClick={handleSaveProduct} className="flex-1 bg-Zoya-maroon text-white px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#4a0d16] transition">
                    {editingProduct ? 'Save Changes' : 'Publish Design'}
                  </button>
                  {editingProduct && <button onClick={() => setEditingProduct(null)} className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 border border-stone-200">Cancel</button>}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative aspect-[4/5] bg-white border border-stone-200 flex flex-col items-center justify-center overflow-hidden group">
                {(editingProduct?.image || newProduct.image) ? (
                  <>
                    <img src={editingProduct ? editingProduct.image : newProduct.image} className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-[10px] uppercase font-bold tracking-widest">Replace Photo</span>
                      <input type="file" className="hidden" accept="image/webp,image/avif,image/jpeg,image/png" onChange={handleImageUpload} />
                    </label>
                  </>
                ) : (
                  <label className="flex flex-col items-center gap-4 cursor-pointer text-stone-300 hover:text-Zoya-gold transition">
                    <ImageIcon className="w-16 h-16" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Upload High-Res Visual</span>
                    <input type="file" className="hidden" accept="image/webp,image/avif,image/jpeg,image/png" onChange={handleImageUpload} />
                  </label>
                )}
                {isAiEditing && (
                  <div className="absolute inset-0 bg-[#1a080a]/80 flex flex-col items-center justify-center text-white p-8 text-center z-10">
                    <Loader2 className="w-12 h-12 animate-spin text-Zoya-gold mb-4" />
                    <p className="font-serif italic">AI Studio enhancing the masterpiece...</p>
                  </div>
                )}
              </div>

              {(editingProduct?.image || newProduct.image) && (
                <div className="bg-white p-8 border border-stone-100 shadow-sm">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-Zoya-gold mb-6 flex items-center gap-3">
                    <Wand2 className="w-4 h-4" /> AI Visual Enhancement
                  </h3>
                  <div className="flex gap-4">
                    <input 
                      placeholder="e.g., 'Change background to royal red velvet'" 
                      value={aiPrompt} 
                      onChange={e => setAiPrompt(e.target.value)}
                      className="flex-grow p-4 border text-[10px] font-medium outline-none focus:border-Zoya-gold"
                    />
                    <button 
                      onClick={handleAiEdit}
                      disabled={isAiEditing || !aiPrompt}
                      className="bg-stone-50 text-Zoya-maroon px-8 py-4 text-[10px] font-bold uppercase tracking-widest border border-Zoya-maroon hover:bg-Zoya-maroon hover:text-white transition shadow-sm disabled:opacity-30"
                    >
                      Magic Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-stone-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b">
                <tr className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  <th className="px-10 py-6">Masterpiece</th>
                  <th className="px-10 py-6">Category</th>
                  <th className="px-10 py-6">Valuation</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-stone-50 transition">
                    <td className="px-10 py-6 flex items-center gap-4">
                      <img src={p.image} className="w-16 h-16 object-cover shadow-sm grayscale hover:grayscale-0 transition-all duration-500" />
                      <span className="font-bold text-stone-800 text-[11px] uppercase tracking-widest">{p.name}</span>
                    </td>
                    <td className="px-10 py-6 text-[10px] uppercase tracking-widest text-stone-400">{p.category}</td>
                    <td className="px-10 py-6 font-serif text-lg">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex gap-4 justify-end">
                        <button onClick={() => { setEditingProduct(p); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="p-3 text-stone-400 hover:text-Zoya-gold transition"><Edit2 className="w-5 h-5" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-3 text-stone-400 hover:text-red-600 transition"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="bg-white p-12 border border-stone-100 shadow-sm">
            <h2 className="text-2xl font-serif mb-8 text-Zoya-maroon">1. Select Patrons</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
              {customers.map(c => (
                <label key={c.id} className="flex items-center gap-4 p-4 border border-stone-50 hover:bg-stone-50 cursor-pointer group">
                  <input type="checkbox" checked={selectedCustomers.includes(c.id)} onChange={e => {
                    if (e.target.checked) setSelectedCustomers([...selectedCustomers, c.id]);
                    else setSelectedCustomers(selectedCustomers.filter(id => id !== c.id));
                  }} className="w-4 h-4 accent-Zoya-maroon" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-stone-800 group-hover:text-Zoya-maroon transition">{c.name}</p>
                    <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em]">{c.event} • {c.phone}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white p-12 border border-stone-100 shadow-sm">
              <h2 className="text-2xl font-serif mb-8 text-Zoya-maroon">2. Choose Collection Piece</h2>
              <select value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} className="w-full p-4 border bg-white text-[10px] uppercase tracking-widest font-bold outline-none focus:border-Zoya-gold">
                <option value="">Select Masterpiece</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name} - ₹{p.price.toLocaleString()}</option>)}
              </select>
            </div>
            <button onClick={handleBulkSend} disabled={!!sendingStatus} className="w-full bg-Zoya-maroon text-white py-8 text-[12px] uppercase font-bold tracking-[0.5em] shadow-2xl hover:bg-[#4a0d16] disabled:opacity-50 transition active:scale-[0.98]">
              {sendingStatus ? (
                <span className="flex items-center justify-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> {sendingStatus}</span>
              ) : (
                <span className="flex items-center justify-center gap-3"><Send className="w-5 h-5" /> Launch Bespoke Campaign</span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductDetail = ({ products }: { products: Product[] }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const navigate = useNavigate();

  if (!product) return <div className="py-24 text-center">Masterpiece not found.</div>;

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden shadow-2xl border border-stone-100 group">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        </div>
        <div className="space-y-10">
          <div>
            <p className="text-Zoya-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-4">{product.category}</p>
            <h1 className="text-6xl font-serif text-Zoya-maroon leading-tight">{product.name}</h1>
          </div>
          <p className="text-Zoya-maroon text-3xl font-serif">₹{product.price.toLocaleString('en-IN')}</p>
          <div className="w-20 h-[1px] bg-Zoya-gold"></div>
          <p className="text-stone-500 text-sm leading-relaxed max-w-lg">{product.description}</p>
          <div className="space-y-4 pt-6">
            <button 
              onClick={() => navigate(`/try-on/${product.id}`)}
              className="w-full bg-Zoya-maroon text-white py-6 uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#4a0d16] transition shadow-xl"
            >
              <Camera className="w-5 h-5" /> Virtual Try-On
            </button>
            <button className="w-full border-2 border-Zoya-maroon text-Zoya-maroon py-6 uppercase font-bold tracking-[0.2em] hover:bg-stone-50 transition">
              Find in Boutique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};




const GreetingsPage = ({ products }: { products: Product[] }) => {
  const [profile, setProfile] = useState<UserProfile>({ id: 'temp', email: '', name: '', role: 'user', event: 'Birthday', relation: 'Friend', tone: 'Elegant' });
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GreetingData | null>(null);
  const [cardImage, setCardImage] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const data = await generateGreetingMessage(profile, selectedProduct.name);
      setResult(data);
      const [img, audio] = await Promise.all([
        generateGreetingCard(data.imagePrompt),
        generateGreetingAudio(data.message)
      ]);
      setCardImage(img);
      setAudioUrl(audio);
    } catch (e) {
      alert("AI concierge is currently busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-serif text-Zoya-maroon mb-4">AI Gifting Concierge</h1>
        <p className="text-stone-400 uppercase tracking-widest text-[10px]">Exquisite Bespoke Celebrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="bg-white p-12 shadow-sm border border-stone-100 space-y-8">
          <h2 className="text-2xl font-serif text-Zoya-maroon uppercase tracking-widest border-b pb-6">Personalize</h2>
          <div className="grid grid-cols-2 gap-6">
            <input placeholder="NAME" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="p-4 border text-[10px] uppercase font-bold tracking-widest outline-none focus:border-Zoya-gold" />
            <select value={profile.event} onChange={e => setProfile({...profile, event: e.target.value as any})} className="p-4 border text-[10px] uppercase font-bold tracking-widest bg-white">
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Generic">Celebration</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <input placeholder="RELATION" value={profile.relation} onChange={e => setProfile({...profile, relation: e.target.value})} className="p-4 border text-[10px] uppercase font-bold tracking-widest outline-none focus:border-Zoya-gold" />
            <select value={profile.tone} onChange={e => setProfile({...profile, tone: e.target.value as any})} className="p-4 border text-[10px] uppercase font-bold tracking-widest bg-white">
              <option value="Elegant">Elegant</option>
              <option value="Emotional">Emotional</option>
              <option value="Casual">Casual</option>
            </select>
          </div>
          <select value={selectedProduct.id} onChange={e => setSelectedProduct(products.find(p => p.id === e.target.value) || products[0])} className="w-full p-4 border text-[10px] uppercase font-bold tracking-widest bg-white">
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button 
            onClick={generate}
            disabled={loading}
            className="w-full bg-Zoya-maroon text-white py-6 uppercase font-bold tracking-[0.2em] shadow-xl disabled:opacity-50 flex justify-center items-center gap-4 hover:bg-[#4a0d16] transition"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Craft Luxury Greeting
          </button>
        </div>

        <div className="bg-white p-12 shadow-sm border border-stone-100 flex flex-col items-center justify-center min-h-[500px] relative">
          {loading ? (
            <div className="text-center space-y-6">
              <Loader2 className="w-16 h-16 animate-spin text-Zoya-gold mx-auto" />
              <p className="text-stone-400 animate-pulse font-serif italic text-xl">Weaving your digital tapestry...</p>
            </div>
          ) : result ? (
            <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {cardImage && <img src={cardImage} className="w-full aspect-video object-cover shadow-2xl border-stone-50 border-8" />}
              <div className="text-center space-y-8">
                <p className="text-Zoya-maroon font-serif text-2xl leading-relaxed italic max-w-md mx-auto">"{result.message}"</p>
                <div className="bg-[#fdfbf7] p-10 border-2 border-dashed border-Zoya-gold/40">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-Zoya-gold block mb-3 font-bold">Privilege Membership</span>
                  <p className="text-3xl font-bold tracking-[0.3em] text-Zoya-maroon uppercase">{result.couponCode}</p>
                  <p className="text-xs text-Zoya-maroon/70 mt-4 uppercase tracking-widest font-medium">{result.offerDetails}</p>
                </div>
                {audioUrl && (
                  <div className="bg-stone-50 p-6 flex items-center gap-6">
                    <Volume2 className="w-5 h-5 text-Zoya-maroon flex-shrink-0" />
                    <audio controls className="h-8 flex-grow opacity-80">
                      <source src={audioUrl} type="audio/pcm" />
                    </audio>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center opacity-10">
              <Gift className="w-32 h-32 mx-auto mb-6 text-Zoya-maroon" />
              <p className="font-serif italic text-2xl">Bespoke creation awaiting your touch</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StoreLocator = () => {
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-serif text-Zoya-maroon mb-4">Find us Nearby</h1>
        <p className="text-stone-400 uppercase tracking-widest text-[10px]">Zoya Flagships & Boutiques</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-6">
          {STORE_LOCATIONS.map(s => (
            <div key={s.id} className="p-8 bg-white border border-stone-100 shadow-sm hover:border-Zoya-gold transition-all duration-500 cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-stone-800 text-xs uppercase tracking-widest group-hover:text-Zoya-maroon transition">{s.name}</h3>
                {s.isHeadOffice && <span className="text-[8px] bg-Zoya-gold/10 text-Zoya-gold px-3 py-1 rounded-full font-bold">HEAD OFFICE</span>}
              </div>
              <p className="text-stone-500 text-[10px] mb-8 flex gap-3 leading-relaxed uppercase tracking-widest"><MapPin className="w-4 h-4 flex-shrink-0 text-Zoya-gold" /> {s.address}</p>
              <div className="flex gap-8 pt-6 border-t border-stone-50">
                <button className="text-[10px] font-bold text-Zoya-maroon flex items-center gap-2 hover:text-Zoya-gold transition uppercase tracking-widest"><Navigation className="w-4 h-4" /> Route</button>
                <button className="text-[10px] font-bold text-Zoya-maroon flex items-center gap-2 hover:text-Zoya-gold transition uppercase tracking-widest"><PhoneCall className="w-4 h-4" /> Boutique</button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-2 bg-stone-100 flex items-center justify-center relative overflow-hidden h-[650px] shadow-2xl">
          <div className="absolute inset-0 grayscale contrast-125 opacity-30 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000')] bg-cover"></div>
          <div className="relative z-10 bg-white/90 backdrop-blur-md p-12 text-center shadow-2xl border border-white">
            <MapPin className="w-20 h-20 text-Zoya-maroon mx-auto mb-6 animate-bounce" />
            <h4 className="text-3xl font-serif text-Zoya-maroon mb-3 uppercase tracking-widest">Digital Cartography</h4>
            <p className="font-serif italic text-stone-500">Mapping the world's most beautiful jewelry boutiques...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#110506] text-stone-500 py-24 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-1 md:col-span-2">
        <img 
          src="/zoya_logo.webp" 
          alt="zoya Logo" 
          className="h-14 w-auto object-contain brightness-150 mb-10"
        />
        <p className="text-[10px] uppercase tracking-[0.2em] leading-loose max-w-sm font-semibold opacity-60">India's hallmark of purity and design excellence. From royal heritage collections to modern daily wear, we craft stories in gold and diamonds.</p>
      </div>
      <div>
        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-10 border-b border-white/10 pb-4">Concierge</h4>
        <ul className="space-y-4 text-[9px] uppercase tracking-[0.3em] font-bold">
          <li className="hover:text-Zoya-gold transition cursor-pointer">Boutique Appointments</li>
          <li className="hover:text-Zoya-gold transition cursor-pointer">Jewelry Care Guide</li>
          <li className="hover:text-Zoya-gold transition cursor-pointer">Gold Harvest Scheme</li>
          <li className="hover:text-Zoya-gold transition cursor-pointer">Corporate Gifting</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-10 border-b border-white/10 pb-4">The Atelier</h4>
        <p className="text-[9px] mb-8 uppercase tracking-[0.25em] leading-relaxed opacity-60">Subscribe for early access to our High Jewelry collections and heritage reveals.</p>
        <div className="flex border-b border-stone-800 pb-3 group">
          <input type="email" placeholder="JOIN THE CIRCLE" className="bg-transparent border-none outline-none text-[10px] flex-grow uppercase tracking-[0.3em] font-bold placeholder:text-stone-800" />
          <ArrowRight className="w-5 h-5 text-Zoya-gold cursor-pointer group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
      <p className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-40">© 2025 Zoya - A TATA PRODUCT. ALL RIGHTS RESERVED.</p>
      <div className="flex gap-12 text-[8px] uppercase tracking-[0.4em] font-bold opacity-40">
        <span className="hover:text-white transition cursor-pointer">Security Policy</span>
        <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
      </div>
    </div>
  </footer>
);

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('jb_products');
    const auth = localStorage.getItem('jb_auth');
    if (saved) setProducts(JSON.parse(saved));
    else { setProducts(JEWELRY_PRODUCTS); localStorage.setItem('jb_products', JSON.stringify(JEWELRY_PRODUCTS)); }
    if (auth) setUser(JSON.parse(auth));
  }, []);

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    localStorage.setItem('jb_auth', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('jb_auth');
  };

  const handleUpdateProducts = (newP: Product[]) => {
    setProducts([...newP]);
    localStorage.setItem('jb_products', JSON.stringify(newP));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ProductGallery products={products} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} />} />
            <Route path="/try-on/:id" element={<VirtualTryOn products={products} user={user} />} />
            <Route path="/greetings" element={<GreetingsPage products={products} />} />
            <Route path="/stores" element={<StoreLocator />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard products={products} onUpdateProducts={handleUpdateProducts} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
