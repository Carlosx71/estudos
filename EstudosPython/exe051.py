from win10toast import ToastNotifier 

termo = int(input('Digite o termo: '))
razao = int(input('Digite a razao: '))

decimo = termo + (10-1) * razao
for x in range(termo, decimo + razao, razao ):
    print(x)

toaster = ToastNotifier()
toaster.show_toast("Sample Notification","Python is awesome!!!", duration=2)