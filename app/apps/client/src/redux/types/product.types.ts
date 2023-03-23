export type product = {
   _id: string;
   name: string;
   date: string;
   time: string;
   description: string;
   free: 'Бесплатное' | 'Платное';
   price: string;
   tickets: number;
};
