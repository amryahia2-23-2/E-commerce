import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import React from 'react'


interface ContactItem {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
    
}
const contactItems: ContactItem[] = [
  {
    title: 'Visit Us',
    subtitle: 'New York, USA',
    icon: <MapPin className='w-6 h-6 text-gray-600 group-hover:text-shop_light_green' />
  },
  {
    title: 'Call Us',
    subtitle: '+1 234 567 890',
    icon: <Phone className='w-6 h-6 text-gray-600 group-hover:text-shop_light_green' />
  },
  {
    title: 'Working Hours',
    subtitle: 'Mon - Sat: 9:00 AM - 6:00 PM',
    icon: <Clock className='w-6 h-6 text-gray-600 group-hover:text-shop_light_green' />
  },
  {
    title: 'Email Us',
    subtitle: 'info@freshcart.com',
    icon: <Mail className='w-6 h-6 text-gray-600 group-hover:text-shop_light_green' />
  }
];

function FooterTop() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5 '>
      {contactItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-4 mb-4 border p-4 rounded-lg hover:bg-gray-100 hoverEffect shadow-lg group">
          {item.icon}
          <div>
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-600">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FooterTop

