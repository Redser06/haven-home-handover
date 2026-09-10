export const demoData = {
  address: '12 Oak Drive',
  token: 'HANDOVER-9823-OAK',
  messages: [
    {
      id: '1',
      sender: 'buyer',
      senderName: 'Mike L. (Buyer)',
      text: 'Hi Sarah! Where is the main water shutoff stopcock located?',
      timestamp: '09:18 AM'
    },
    {
      id: '2',
      sender: 'seller',
      senderName: 'Sarah J. (Seller)',
      text: 'Morning Mike! It is under the kitchen sink on the left wall behind the shelf unit.',
      timestamp: '09:22 AM',
      attachment: {
        name: 'Stopcock_Location.jpg',
        url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80'
      }
    },
    {
      id: '3',
      sender: 'buyer',
      senderName: 'Mike L. (Buyer)',
      text: 'Found it, thanks! Also how do I reset the solar inverter if output drops?',
      timestamp: '09:25 AM'
    },
    {
      id: '4',
      sender: 'seller',
      senderName: 'Sarah J. (Seller)',
      text: 'Press the red toggle switch at the base of the inverter unit in the garage for 10 seconds, then release.',
      timestamp: '09:28 AM',
      attachment: {
        name: 'Solar_Inverter_Panel.jpg',
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80'
      }
    }
  ]
};
