from win10toast import ToastNotifier 
import PIL.Image

termo = int(input('Digite o termo: '))
razao = int(input('Digite a razao: '))

decimo = termo + (10-1) * razao
for x in range(termo, decimo + razao, razao ):
    print(x)

ToastNotifier().show_toast("Sample Notification","Python is awesome!!!", icon_path = 'emoji_emoticon.ico', duration=60)