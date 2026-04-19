
import toast from 'react-hot-toast';
import { AlertDialog,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger ,
        AlertDialogCancel,
        AlertDialogAction} from './ui/alert-dialog'
import { cn } from '@/lib/utils';



interface Props{
    title: string,
    Body: string,
    btnText: string,
    action: () => void,
    className?: string,
  
}

function RemoveModal({ title, Body, btnText, action, className }: Props) {

  function handleConfirm() {
    
      action();
      toast.success(`${title} successfully`);
    
    
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
          <button className={cn("bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 hoverEffect" , className)}>
          {title}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action will remove all items from your {`${ Body}`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleConfirm} className="bg-shop_dark_green/70 hover:bg-shop_btn-dark_green hoverEffect">
            {btnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveModal
