const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      {children}
    </div>
  );
};

export default Card;
