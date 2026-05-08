import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Success() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("invoice");
    setOrder(JSON.parse(data));
  }, []);

  const downloadInvoice = () => {
    const doc = new jsPDF();

  
    doc.setFontSize(18);
    doc.text("D&D STORE INVOICE", 70, 15);

    doc.setFontSize(10);
    doc.text(`Name: ${order?.name}`, 14, 30);
    doc.text(`Phone: ${order?.phone}`, 14, 36);
    doc.text(`Address: ${order?.address}`, 14, 42);

    doc.text(`Order ID: ${order?.orderId}`, 140, 30);
    doc.text(`Payment ID: ${order?.paymentId}`, 140, 36);

  
    const tableColumn = ["Product", "Price", "Qty", "Total"];

    const tableRows = order?.products?.map((item) => [
      item.name,
      `₹${item.price}`,
      item.qty || 1,
      `₹${item.price * (item.qty || 1)}`
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      theme: "grid",
      styles: { fontSize: 10 }
    });

   
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.text(
      `TOTAL: ₹${order?.totalAmount}`,
      140,
      finalY
    );

    doc.save("invoice.pdf");
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <div className="border p-4 mt-5">

        <h2 className="font-bold text-lg">INVOICE</h2>

        <p><b>Name:</b> {order?.name}</p>
        <p><b>Phone:</b> {order?.phone}</p>
        <p><b>Address:</b> {order?.address}</p>

        <hr className="my-3" />

        <p><b>Order ID:</b> {order?.orderId}</p>
        <p><b>Payment ID:</b> {order?.paymentId}</p>

        <hr className="my-3" />

        <h3 className="font-bold">Products</h3>

        {order?.products?.map((item, i) => (
          <div key={i}>
            {item.name} - ₹{item.price} x {item.qty || 1}
          </div>
        ))}

        <h2 className="mt-4 font-bold">
          Total: ₹{order?.totalAmount}
        </h2>

      </div>

      <button
        onClick={downloadInvoice}
        className="bg-black text-white px-4 py-2 mt-5"
      >
        Download Invoice PDF
      </button>

    </div>
  );
}

export default Success;