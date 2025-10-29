

export const CartItem = ({ item, onUpdateQuantity }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border border-gray-200">
        <img 
          src={`/api/product/image/${item.image_name}` || '/api/placeholder/80/80'} 
          alt={item.name}
          className="w-16 h-16 object-contain"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">รหัสสินค้า: {item.product_id}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
          disabled={item.quantity <= 1}
        >
          <p className="w-4 h-4" />-<p/>
        </button>
        
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.product_id, parseInt(e.target.value) || 1)}
          className="w-16 h-8 text-center border border-gray-300 rounded"
          min="1"
        />
        
        <button
          onClick={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
        >
          <p className="w-4 h-4" />+<p/>
        </button>
      </div>
      
      <div className="w-24 text-right">
        <p className="font-semibold text-lg">฿{item.price.toLocaleString()}</p>
      </div>
    </div>
  );
};