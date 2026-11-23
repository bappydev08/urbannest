import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";
const categories=["All","Skincare","Makeup","Haircare","Body Care","Sun Care","Fragrance","Gift Sets"];
export default function Shop(){
 const [params,setParams]=useSearchParams();const [sort,setSort]=useState("featured");const active=params.get("category")||"All";const query=params.get("q")||"";
 const list=useMemo(()=>{const term=query.trim().toLowerCase();const arr=products.filter(p=>(active==="All"||p.category===active)&&(!term||`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term)));if(sort==="price-asc")arr.sort((a,b)=>a.price-b.price);if(sort==="price-desc")arr.sort((a,b)=>b.price-a.price);if(sort==="rating")arr.sort((a,b)=>b.rating-a.rating);if(sort==="name")arr.sort((a,b)=>a.name.localeCompare(b.name));return arr;},[active,sort,query]);
 const chooseCategory=(category)=>setParams(current=>{const next=new URLSearchParams(current);if(category==="All")next.delete("category");else next.set("category",category);return next;});
 return <div className="shop-page"><div className="shop-page__intro"><p className="eyebrow">The UrbanNest Beauty collection</p><h1>Find your everyday glow.</h1><p>Explore skincare, makeup and feel-good essentials for your daily ritual.</p></div><div className="shop-toolbar"><div className="category-filters">{categories.map(c=><button key={c} onClick={()=>chooseCategory(c)} className={active===c?"is-selected":""}>{c}</button>)}</div><div className="shop-toolbar__right"><span>{list.length} products</span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="rating">Top rated</option><option value="name">Name: A to Z</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div></div>{query&&<p className="search-result-label">Search results for “{query}”</p>}<motion.div layout className="product-grid shop-product-grid">{list.map(p=><ProductCard key={p.id} product={p}/>)}</motion.div>{list.length===0&&<p className="empty-state">No products found. Try another search or category.</p>}</div>;
}
