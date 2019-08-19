#from PIL import Image
#from Tkinter import *
#import tkMessageBox
#from datetime import datetime
from tkinter import *
import PIL.Image
from io import BytesIO
import tkinter.messagebox
import http.client
from datetime import timedelta, date
import datetime
import base64
import requests
import json
import os


class CreateToolTip(object):
	'''
	create a tooltip for a given widget
	'''
	def __init__(self, widget, text='widget info'):
		self.widget = widget
		self.text = text
		self.widget.bind("<Enter>", self.enter)
		self.widget.bind("<Leave>", self.close)
	def enter(self, event=None):
		x = y = 0
		x, y, cx, cy = self.widget.bbox("insert")
		x += self.widget.winfo_rootx() + 25
		y += self.widget.winfo_rooty() + 20
		# creates a toplevel window
		#self.tw = tk.Toplevel(self.widget)
		self.tw = Toplevel(self.widget)
		# Leaves only the label and removes the app window
		self.tw.wm_overrideredirect(True)
		self.tw.wm_geometry("+%d+%d" % (x, y))
		label = Label(self.tw, text=self.text, justify='left',
		background='yellow', relief='solid', borderwidth=1,
		font=("times", "8", "normal"))
		label.pack(ipadx=1)
	def close(self, event=None):
		if self.tw:
			self.tw.destroy()
  
class Application:
	def __init__(self, master=None):
		def CurSelet(evt):
			value=str((self.listbox.get(self.listbox.curselection())))
			ttp = CreateToolTip(self.inicio,self.workitens_sr_des[value])
			print(value)

		self.atividade=''
		#self.sevidor='http://suportedev.maxinst.intra'
		self.sevidor='http://suporte.maxinst.intra'
		self.iniciot = datetime.datetime.now()
		self.fontePadrao = ("Arial", "10")
		self.primeiroContainer = Frame(master)
		self.primeiroContainer["pady"] = 10
		self.primeiroContainer.pack()

		self.segundoContainer = Frame(master)
		self.segundoContainer["padx"] = 20
		self.segundoContainer["pady"] = 2
		self.segundoContainer.pack()
		
		self.terceiroContainer = Frame(master)
		self.terceiroContainer["padx"] = 20
		#self.terceiroContainer["height"] = 10
		self.terceiroContainer.pack()

		self.quartoContainer = Frame(master)
		self.quartoContainer["pady"] = 10
		self.quartoContainer.pack()

		self.quintoContainer = Frame(master)
		self.quintoContainer["padx"] = 20
		self.quintoContainer.pack()

		self.sextoContainer = Frame(master)
		self.sextoContainer["padx"] = 20
		self.sextoContainer.pack()		

		self.setimoContainer = Frame(master)
		self.setimoContainer["padx"] = 20
		self.setimoContainer.pack()			
		
		self.oitavoContainer = Frame(master)
		self.oitavoContainer["padx"] = 20
		self.oitavoContainer.pack()			
		
		#Container do salva senha
		self.nonoContainer = Frame(master)
		self.nonoContainer["padx"] = 20
		self.nonoContainer.pack()	

		self.titulo = Label(self.primeiroContainer, text="Dados de conexao")
		self.titulo["font"] = ("Arial", "10", "bold")
		self.titulo.pack()

		self.nomeLabel = Label(self.segundoContainer,text="Usuario", font=self.fontePadrao)
		self.nomeLabel["width"] = 6
		self.nomeLabel.pack(side=LEFT)

		self.nome = Entry(self.segundoContainer)
		self.nome["width"] = 20
		#self.nome["height"] = 1
		self.nome["font"] = self.fontePadrao
		self.nome.pack(side=LEFT)

		self.senhaLabel = Label(self.terceiroContainer, text="Senha", font=self.fontePadrao)
		self.senhaLabel["width"] = 6
		self.senhaLabel.pack(side=LEFT)

		self.senha = Entry(self.terceiroContainer)
		self.senha["width"] = 20
		#self.senha["height"] = 1
		self.senha["font"] = self.fontePadrao
		self.senha["show"] = "*"
		self.senha.pack(side=LEFT)
		self.senha.bind('<Return>', (lambda event: self.verificaSenha()))

		#CheckBox Salvar Senha
		#self.salvarSenha = Entry(self.nonoContainer)
		canvas = Canvas(root, bg ="grey", height = 1, width = 250)
		coord = 10, 330, 300, 330
		line = canvas.create_line(coord, fill='black')
		canvas.pack()
		self.teste = Frame(master)
		self.salvarSenha = Entry(self.teste)
		self.senhaValue = IntVar()
		self.salvarSenha = Checkbutton(root, text = "Salvar Senha", variable = self.senhaValue, onvalue = 1, offvalue = 0, height = 1, width = 25, anchor=W)
		#self.salvarSenha.config(anchor=W, bd=500, )
		self.salvarSenha.pack()	

		self.autenticar = Button(self.quartoContainer)
		self.autenticar["text"] = "Autenticar"
		self.autenticar["font"] = ("Calibri", "8")
		self.autenticar["width"] = 12
		self.autenticar["command"] = self.verificaSenha
		self.autenticar.pack()

		self.mensagem = Label(self.quartoContainer, text="", font=self.fontePadrao)
		self.mensagem.pack()

		self.mensagem1 = Label(self.quintoContainer, text="", font=self.fontePadrao)
		self.mensagem1.pack()
		self.listbox = Listbox(self.quintoContainer)	
		self.listbox.bind('<<ListboxSelect>>',CurSelet)		
		self.listbox.pack()
		
		self.quintoContainer.pack_forget()	
		
		self.inicio = Button(self.sextoContainer)
		self.inicio["text"] = "Iniciar Atividade"
		self.inicio["font"] = ("Calibri", "8")
		self.inicio["width"] = 12
		self.inicio["command"] = self.inicio_apontamento        
		self.inicio.pack()
		self.sextoContainer.pack_forget()
		
		self.memoLabel = Label(self.setimoContainer,text="Memo:", font=self.fontePadrao)
		self.memoLabel.pack(side=LEFT)

		self.memo = Entry(self.setimoContainer)
		self.memo["width"] = 30
		self.memo["font"] = self.fontePadrao
		self.memo.pack(side=LEFT)
		self.setimoContainer.pack()
		self.setimoContainer.pack_forget()

		self.fim = Button(self.oitavoContainer)
		self.fim["text"] = "Fim Atividade"
		self.fim["font"] = ("Calibri", "8")
		self.fim["width"] = 12
		self.fim["command"] = self.fechar_apontamento
		self.fim.pack()
		self.oitavoContainer.pack_forget()

		if os.path.isfile('acess.txt') == True:
			file = open("acess.txt","r")
			contains = file.read()
			userData = contains.split('\n', 1)
			self.nome.insert(0, str(userData[0]))	
			self.senha.insert(0, str(userData[1]))
			self.salvarSenha.select()


	def inicio_apontamento(self):
		self.mensagem.config(bg="red")
		self.atividade=self.listbox.get(self.listbox.curselection())
		self.iniciot = datetime.datetime.now()
		di=datetime.datetime.now()-timedelta(minutes=1)
		self.inicio_formatada = str(di)
		self.starttime = self.inicio_formatada[self.inicio_formatada.find(' ')+1:self.inicio_formatada.find('.')]
		#print(self.starttime)
		self.inicio_formatada = self.inicio_formatada.replace(' ','T')
		self.inicio_formatada = self.inicio_formatada[0:self.inicio_formatada.find('.')]
		self.inicio_formatada = self.inicio_formatada + '-03:00'
		#print(self.inicio_formatada)
		self.iniciot=self.iniciot-timedelta(minutes=1)
		self.mensagem["text"] = "Atividade " + str(self.atividade) +"\nIniciada as " +str(self.iniciot)
		self.quartoContainer.pack()
		self.mensagem.pack()
		self.autenticar.pack_forget()
		self.quintoContainer.pack_forget()
		self.sextoContainer.pack_forget()
		self.setimoContainer.pack()
		self.oitavoContainer.pack()

	def fechar_apontamento(self):
		df1 = datetime.datetime.now() - timedelta(minutes=1) 
		fimdata_formatada = str(df1)
		fimdata_formatada = fimdata_formatada.replace(' ','T')
		fimdata_formatada = fimdata_formatada[0:fimdata_formatada.find('.')]
		fimdata_formatada = fimdata_formatada + '-03:00'
		finishtime = fimdata_formatada[fimdata_formatada.find(' ')+1:fimdata_formatada.find('.')]
		finishdate = fimdata_formatada[0:fimdata_formatada.find(' ')]
		print(fimdata_formatada)
		chamado = self.atividade
		#chamado = self.listbox.get(self.listbox.curselection())
		usuario = self.nome.get()
		senha = self.senha.get()
		memo = self.memo.get()
		laborcode = self.recuperaLabor()
		fim = datetime.datetime.now()
		fim = fim - timedelta(minutes=1)
		df = fim - self.iniciot
		print(df)
		dfs = str(df)
		s = dfs.split('.')
		hhmmss = s[0]
		[hours, minutes, seconds] = [int(x) for x in hhmmss.split(':')]
		x = datetime.timedelta(hours=hours, minutes=minutes, seconds=seconds)
		segundos=x.seconds
		regularhrs=segundos/3600.0
		print(regularhrs)
		result = tkMessageBox.askyesno("Confirmacao","Confirma que gastou "+ str(df) + " no chamado\workitem "+str(chamado)+"?")
		self.mensagem1["text"] = "Usuario "+usuario+"\nWorkitens \ Ticket"
		#self.mensagem["text"] = "Autenticado"
		self.primeiroContainer.pack_forget()
		self.segundoContainer.pack_forget()
		self.terceiroContainer.pack_forget()
		self.quartoContainer.pack_forget()
		#self.mensagem.pack_forget()
		#self.autenticar.pack_forget()
		self.quintoContainer.pack()
		self.sextoContainer.pack()
		self.setimoContainer.pack_forget()
		self.oitavoContainer.pack_forget()
		hrstr =str(regularhrs)
		#hrstr = hrstr.replace('.',',')
		#egularhrs=1
		if result == True:
			url = self.sevidor+"/maximo/rest/mbo/LABTRANS/"
			if chamado[:2] == 'SR':
				querystring = {"_action":"AddChange","LABORCODE":laborcode,"REGULARHRS":hrstr,"ticketid":chamado,"ticketclass":"SR","siteid":"SEDE","memo":memo,"STARTDATETIME":self.inicio_formatada,"FINISHDATETIME":fimdata_formatada,"STARTTIME":self.starttime}
				#querystring = {"_action":"AddChange","LABORCODE":laborcode,"REGULARHRS":hrstr,"ticketid":chamado,"ticketclass":"SR","siteid":"SEDE","memo":memo,"STARTDATETIME":self.inicio_formatada,"FINISHDATETIME":fimdata_formatada}
				#querystring = {"_action":"AddChange","LABORCODE":laborcode,"REGULARHRS":hhmmss,"ticketid":chamado,"ticketclass":"SR","siteid":"SEDE","memo":memo,"STARTDATETIME":self.inicio_formatada,"FINISHDATETIME":fimdata_formatada}
			else:	
				querystring = {"_action":"AddChange","LABORCODE":laborcode,"REGULARHRS":hrstr,"refwo":chamado,"siteid":"SEDE","memo":memo,"STARTDATETIME":self.inicio_formatada,"FINISHDATETIME":fimdata_formatada,"STARTTIME":self.starttime}
				#querystring = {"_action":"AddChange","LABORCODE":laborcode,"REGULARHRS":regularhrs,"refwo":chamado,"siteid":"SEDE","memo":memo,"STARTDATETIME":self.inicio_formatada,"FINISHDATETIME":fimdata_formatada}
			noencoder_maxauth=usuario+':'+senha
			encoder_maxauth = base64.b64encode(noencoder_maxauth.encode())
			payload = ""
			headers = '{"maxauth":"'+ str(encoder_maxauth)+'","cache-control":"no-cache","Postman-Token":"91fe8b6f-f0ea-4d02-b247-da31302afb16"}'
			print(headers)
			print(querystring)
			h = json.loads(headers)
			response = requests.request("POST", url, data=payload, headers=h, params=querystring)
			print(response.text)
		print (result)

	#def CurSelet(evt):
		#value=str((self.listbox.get(self.listbox.curselection())))
		#item=self.listbox.get(1)
		#ttp = CreateToolTip(self.inicio,"teste")
		#button1_ttp = CreateToolTip(self.inicio, \
		#self.listbox.get(self.listbox.curselection()))
		#print value
		#print('teste')		
		
	#Metodo recupera a Mao de obra do usuario logado
	def recuperaWO(self):
		
		usuario = self.nome.get()
		senha = self.senha.get()
		noencoder_maxauth=usuario+':'+senha
		encoder_maxauth = base64.b64encode(noencoder_maxauth.encode())
		laborcode = self.recuperaLabor()
		#url = self.sevidor+"/maximo/rest/mbo/WPLABOR/?_format=json&laborcode="+laborcode
		url = self.sevidor+"/maximo/oslc/script/MAXINSTWORKITENS_SR"
		querystring = ""
		payload = ""
		headers = '{"maxauth":"'+ str(encoder_maxauth)+'","cache-control":"no-cache","Postman-Token":"91fe8b6f-f0ea-4d02-b247-da31302afb16"}'
		print (headers)
		print (url)
		h = json.loads(headers)
		response = requests.request("GET", url, data=payload, headers=h, params=querystring)
		print(response.text)
		
		binary = response.text
		jsonToPython = json.loads(binary)
		self.workitens_sr_des = json.loads(binary)
		'''
		text = '{"data": [{"description": "Workitem Maxinst para Reuni","workitem": "MAX0REUNI"},{"description": "Tarefa Teste","taskid": "10","workitem": "MAX0TESTE"},{"description": "teste da OS de workitem","workitem": "MAX0PROJET"},{"description": "MAXTESTEAPONT","workitem": "MAX0TESTE"}]}'
		jsonToPython = json.loads(text)
		self.workitens_sr_des = json.loads(text)
		'''
		
		workitens_sr_descricao = '{"'
		workitens = '{"workitens":["'
		for wplabor in jsonToPython["data"]:
			#attributes=wplabor['Attributes']
			wpdescription = wplabor.get('description')
			wpdescription=wpdescription.replace('"','')
			wpdescription=wpdescription.replace("'","")
			workitemdesc=wplabor.get('workitem')
			workitemdesc = workitemdesc.replace('"','')
			workitemdesc = workitemdesc.replace("'","")
			#workitens = workitens + wplabor.get('workitem') + '","'
			#workitens_sr_descricao = workitens_sr_descricao + wplabor.get('workitem')  +'":"' +  wplabor.get('description') + '","'
			workitens = workitens + workitemdesc + '","'
			workitens_sr_descricao = workitens_sr_descricao + wplabor.get('workitem')  +'":"' +  wpdescription + '","'
		
		if workitens != '{"workitens":["':
			#print (workitens)
			#print(workitens_sr_descricao)
			workitens=workitens[:-2]
			workitens=workitens+']}'
			#print (workitens)
			workitens_sr_descricao=workitens_sr_descricao[:-2]
			workitens_sr_descricao=workitens_sr_descricao+'}'
			#print(workitens_sr_descricao)
			self.workitens_sr_des = json.loads(workitens_sr_descricao)
			#print(self.workitens_sr_des)
			#print(workitens)
			return workitens
		else:
			return None

	#Metodo recupera a workitens do usuario
	def recuperaLabor(self):
		usuario = self.nome.get()
		senha = self.senha.get()
		noencoder_maxauth=usuario+':'+senha
		encoder_maxauth = base64.b64encode(noencoder_maxauth.encode())
		url = self.sevidor+"/maximo/rest/mbo/LABOR/"
		querystring = {"personid":self.nome.get(),"_format":"json"}
		payload = ""
		data = {}
		#print(encoder_maxauth)
		headers = '{"maxauth":"'+ str(encoder_maxauth)+'","cache-control":"no-cache","Postman-Token":"91fe8b6f-f0ea-4d02-b247-da31302afb16"}'
		#print(headers)
		h = json.loads(headers)
		response = requests.request("GET", url, data=payload, headers=h, params=querystring)
		#print(response.text)
		binary = response.text
		jsonToPython = json.loads(binary)
		labor = jsonToPython["LABORMboSet"]['LABOR'][0]
		attributes=labor['Attributes']
		print(attributes.get('LABORCODE').get('content'))
		return attributes.get('LABORCODE').get('content')

	def gravaSenha(self):
		if self.senhaValue.get() == 1:
			print("############## \033[32m" + str(self.senhaValue.get()) + "\033[m ##############")
			if os.path.isfile('acess.txt') == True:
				file = open("acess.txt","r")
				contains = file.read()
				userData = contains.split('\n', 1)
				file.close()
			else:
				file = open("acess.txt","w+")
				file.write(str(self.nome.get()) + "\n" + str(self.senha.get()))
				file.close()
		else:
			if os.path.exists("acess.txt") == True:
				print('\033[32m'+'=-' * 7 + ' Apagando arquivo de dados ' + '-=' * 7 + '\033[m') 
				os.remove("acess.txt")   		


	#Metodo verificar senha
	def verificaSenha(self):
		self.gravaSenha()
		usuario = self.nome.get()
		senha = self.senha.get()
		noencoder_maxauth=usuario+':'+senha
		encoder_maxauth = base64.b64encode(noencoder_maxauth.encode())
		#url = self.sevidor+"/maximo/oslc/script/MAXINSTAPPLOGIN"
		self.sevidor = "suporte.maxinst.intra"
		url = self.sevidor+"/maximo/rest/mbo/PERSON/"
		#querystring = {"action":"login"}
		querystring = {"personid":usuario,"_format":"json"}
		conn = http.client.HTTPConnection("suporte.maxinst.intra")
		payload = ""
		#headers = '{"maxauth":"'+ str(encoder_maxauth)+'","cache-control":"no-cache","Postman-Token":"91fe8b6f-f0ea-4d02-b247-da31302afb16"}'				
		senha = str(encoder_maxauth)
		print(senha[1:])
		headers = {
		   'maxauth': senha[1:],
		   'cache-control': "no-cache",
		   'Postman-Token': "7d953751-3549-4a4c-b943-c8b09266463e"
		   }
		conn.request("GET", "http://suporte.maxinst.intra/maximo/rest/mbo/PERSON?_format=json", payload, headers, querystring)
		res = conn.getresponse()
		data = res.read()
		print(data.decode("utf-8"))
		response = data.decode("utf-8")
		if response[:21] == "Error 400: BMXAA7901E":
			print("ERRO......")
			self.mensagem["text"] = "Erro na autenticacao"
		else:
			binary = data.decode("utf-8")
			#binary = response.text
			jsonToPython = json.loads(binary)
			#status=jsonToPython.get('status')
			person = jsonToPython["PERSONMboSet"]['PERSON'][0]
			attributes=person['Attributes']
			print(attributes.get('STATUS').get('content'))
			status=attributes.get('STATUS').get('content')
			if status == "ACTIVE":
				self.mensagem1["text"] = "Usuario "+usuario+"\nWorkitens \ Ticket"
				self.primeiroContainer.pack_forget()
				self.segundoContainer.pack_forget()
				self.terceiroContainer.pack_forget()
				self.quartoContainer.pack_forget()
				self.quintoContainer.pack()
				self.sextoContainer.pack()
				wo_itens=self.recuperaWO()
				workitens = json.loads(wo_itens)
				for workitem in workitens['workitens']:
					self.listbox.insert(END,workitem)
				
				item=self.listbox.get(1)
				ttp = CreateToolTip(self.inicio,"teste")
				#ttp = CreateToolTip(self.listbox,"teste")
				
			else:
				self.mensagem["text"] = "Erro na autenticacao"
		'''
		self.mensagem1["text"] = "Usuario "+usuario+"\nWorkitens \ Ticket"
		self.primeiroContainer.pack_forget()
		self.segundoContainer.pack_forget()
		self.terceiroContainer.pack_forget()
		self.quartoContainer.pack_forget()
		self.quintoContainer.pack()
		self.sextoContainer.pack()
		wo_itens=self.recuperaWO()
		workitens = json.loads(wo_itens)
		for workitem in workitens['workitens']:
			self.listbox.insert(END,workitem)
		'''
		#self.workitens_sr = {"teste1":"descricao do teste1","teste2":"valor da descricao do teste2"}
		#self.listbox.insert(END,"teste1")
		#self.listbox.insert(END,"teste2")

 

root = Tk()
ent = Entry(root)
data = 'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOCAAADggBlE5IlgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAC1LSURBVHja7d1/rFXlne/x8YgnIIgkksgfxEiIMf6F0THXRK5BY69m7r3UqFzrVRCndMZxxoqN1Wm0XnH0jNbWa1sFi4NUWqVlAG8kmaj3ipZp/RGUkmqtFX9eI8hVoJQeUH6cfZ+HLlrUA+y9z95rrWet1zd5JwbP2Xuf7/Os7+d9zt5rrb9oNBp/AaDc3PP2khGB8YFJgbMD0wJXBm4M3B14KLA0sCLwROCZwHOBlwKvBNYF3g18ENgS6A/szujP/u2D7GvWZd/zUvYYz2SPuSJ7joey57wxew3Tstc0KXuNI6wZUH40ASg22HsDEwPnBGYFbg88HHgqsDbwXmB7oJEY27PXvjb7WR7OfrZZ2c8af+ZeewAgAEBVA74ncHxgSuCKwJzAosCqLCD3JBjunWJP1oNVWU/mZD2akvWsxx4CCACQQtiPzf4Ufk1gQWB1or+9l+mvCKuzXl6T9XasvQYQAKDIP9vH97unB+4KPB5YL7BzY33W87uyNZjk7QSAAADdCPz4fvWMwPzAy4FdQrh07MrWZn62VhPtXYAAAK2E/bDAaYHZ2SfeNwjXZNmQreHsbE2H2eMAAQD2Bf7owLmBWwMrs1PihGc16c/W+NZszUc7BkAAgHp9Kv/07BPnL9T8U/h1Z0+2B+Zke8JZByAAQMVCf1zg8sDiwCbBhwOwKdsjca+Mc+yAAABpvo9/ZqAvsCYwINzQIgPZ3unL9pLPD4AAACUN/aOz39yWBbYKMHSYrdneinvsaMccCABQbOgfFbg08FjgEyGFnPgk23Nx7x3lWAQBAPIJ/ZGBiwPLAzuEEQpmR7YX454c6RgFAQA6G/rxTngXBpY4TQ8lP81wSbZX3RERBAAYwul65wUeCWwTLkiMbdnePc/phSAAQHPBH+8nf3N2X3pBgirwbranxzvGQQCAT4f+4YGpgRWB3QIDFWV3tsfjXj/csQ8CgDoH/4TAbYH3hQNqxvvZ3p9gFoAAoC6hf0TgosCTLtAD7D0GnsyOiSPMCBAAVDH4x2bvg2409IFB2ZgdI2PNDBAAVCH4TwjMC2w34IGm2J4dMyeYISAASDH4Jwcedbc9YEh3K4zH0GQzBQQAKXyaP76X+bzhDXSU57Njy9kDIAAo3eV5rw68aVADXeWt7Fhz2WEQABQa/KOzDy1tNpiBXNmcHXujzSIQAOT9G/8NgU0GMVAom7Jj0V8EQADQ1eAfHrjWqXxAKU8hjMfmcLMKBACdDP7ewFWu2AckcYXBeKz2ml0gABhK8A8LzHJjHiDJGxDFY3eYWQYCgFaCP96Kd3rgDYMUSJo3smPZLYlBAHDI8J8SWGtwApUiHtNTzDgQABzoznzLDEqg0ixzB0IQAOwL/lGBvsDHhiNQCz7OjvlRZiABQD2D/7DAzMAGAxGoJRuyGXCYmUgAUJ/wPyOw2gAEkM2CM8xGAoBqB/9xgcUGHoBBiLPhOLOSAKB6d+m7LtBvyAE4CP3ZrHDXQQKACoT/yYEXDTYALRBnxslmKAFAutftvyOwyzAD0Aa7shni/gIEAIldzOd1AwxAB3jdRYQIAMof/GMCDwQGDC0AHWQgmy1jzFoCgPKF/wWB9QYVgC4SZ8wFZi4BQDmCf1xgucEEIEfizBlnBhMAFBf+UwMfGkYACiDOnqlmMQFAvsF/ZOB+AwhACYiz6EizmQCg++F/SuA1QwdAiYgz6RQzmgCgO8HfE7g+sNOwAVBCdmYzqsfMJgDoXPiPD6w0YAAkQJxV481uAoChh/+0wGZDBUBCxJk1zQwnAGgv+EcFFhokABImzrBRZjoBQPPhf2LgVcMDQAWIs+xEs50A4NDhf35gq6EBoELEmXa+GU8AcOBP+fe5jj+ACt9PoM9ZAgQAnw7/YwJPGBAAakCcdceY/QRA+P/xwj7vGAoAasQ7LhxEAOoe/jMDOwwDADUkzr6ZsoAA1C34ewNzDQAA2DsLe2UDAahD+B8beNZBDwB/Is7EY2UEAahy+J8UeNvBjjJw77rFe9ELlIQ4G0+SFQSgiuF/VmCLgxx58703f9JY/rN7G2sX3th49+6vNjbd+pXGxzdMbzRmf2kv8b/jv8X/F78mfm38Hr1DAcQZeZbMIABVCv8Z97iLH3Jm+c++3/jt3Osan1z/57Bvlvg98XvjY+glcibOyhmygwBUIfxvcUAjT368+oG9v823GvoHIj5WfEy9Rc7cIkMIQMqf9F/kIEZezP3tI41fz7+hMXDtJR0L/33Ex4yPHZ9Dr5Eji5whQABSC/8xgacdvMiLhWsXNj76p7/pePB/lvgc8bn0HDkSZ+kY2UIAUgj/Cfe4kx9yZOm/39fY8Y8zuh7++4jPFZ9T75EjcaZOkDEEoMzhf2pgo4MVebFs1X2NPV+7JLfw30d8zvjc1gA5EmfrqbKGAJQx/Cff4za+yJEf/vLBT53OlzfxueNrsBbIkThjJ8scAlCm8P9CoN/BibyY99rDjc1zvlJY+O8jvob4WqwJciTO2i/IHgJQhvD/YuBjByXy5LV5Xy88/PcRX4s1Qc7EmftFGUQAigz/SwK7HIzIk0demD+kwN759Usb73/r7xu//OGNe4n/Hf9tKI8ZX5O1Qc7E2XuJLCIARYT/rMAeByHy5v9+5+o2zuP/UmPNQzc1Fr20oPHdtz7/mPHf4v+LXxO/ttXHj6/J2qAA4gyeJZMIQJ7hPzsw4OBD3jz6zPdbDuff3fLlxr/+Ym7TzxG/Nn5Pq88TX5s1QgHEWTxbNhGAPML/JgcciiJen7+VUI5ff9/rrd/xL35PO89ljVAgN8koAtDN8L/TQYaiiHfoa+XGPlv+x6zGva+3f+ne+L3xMVq5gZC7CKJg7pRVBED4o3LE2/S28p7/kl/MG/Jzxsdo5TMB8TVaK5AAAuDP/kAHWbvwxqaDOH6Yr1PPGx+r2eeNr9FawdsBBKBKH/hzQKFwWrnFb/xEf6eeNz5WK7cOtlYoCT4YSACGfKqfT/ujFGy69StNn+c/2Kl+7RIfq9nrBMTXaK1QorMDnCJIANq+yI/z/FEamr3uf7ywT6efOz5ms/cHsFYo2XUCXCyIALR8eV9X+ENpuHfd4qb/DB+v7tfp54+P2ezzx9dqzVCyKwa6bDABaPrGPq7tj1Ix/9eLkhGA+FqtGUp47wA3ECIAh7ylr7v6IWkBKPItAAKAEhNnu1sJE4BBw//Ue/54r2kHCpIWgJ1fv6wLHwK8jACgCsQZf6rMIwD7h/+EwEYHB6ogAJGH1nTuNMD4WK08NwFAyYmzfoLsIwAx/McEXnVQoEoC8OKPbu7Yc8fHIgCoGHHmjyEA9Q7/3sDTDgZUTQAGvnZJ4yfP3T/k542PER+LAKCCxNnfSwDqKwCLHASoogBENs/5SuP7b7R/c574vfExWn1eAoCEWEQA6hn+t9j8GIwfr36g8asF3ygVr/7g+paDOPKb+69v67z8+D3xe9t5zvhay9a/f/35XHsbB+IWAlCv8J9h0+NArPg/97QVfGVl8y2zGj9t4c6A8Wvj91SpB089dqe9jYMxgwDUI/zPCuy04VEXAdh3e+CXFn3zj2cHvPXTz//c4d/i/4tf08rtfwkAKkLMhLMIQLXD/6TAFpsddROA/fnk+ssa73376r2f7o/E/47/VuWfmQCgCWI2nEQAqhn+xwbetslRdwGoIwQATRIz4lgCUL3T/Z61uUEACABwCJ6ty+mBdRGAuTY1CAABAJpkLgGoRvjPtJlBAAiAvY0WmUkA0g7/UwI7bGQQAAJgb6NFYnacQgDSDP9jAu/YxCAAIABok5ghxxCAtMK/J/CEzQsCAAKAIRKzpIcApCMAfTbt4NzyiwWN/37nzY1z/+GaxpQrrsIg3PQ3s4Rmxbj7b79sbx+A//R3X218qe+bjRtX/sCMPDB9BCCN8D8/MGDDfp6///G3G6dNndk45a9m4CB87b9dJjQrRt8ll9nbh+DU/3J548v395mVgxMz5XwCUO7wPzGw1Wb9PDeveqDxl//1coOOABAAHJj/PKNx/b/dZ2YOTsyWEwlAOcN/VOBVm3RwLrz5G4YbASAAOCR/NftaM/PAxIwZRQDKJwALbc4DM2Xm3xluBIAA4JD8hwv+unHPW2bmQVhIAMoV/tNsyoNz+oV/bbgRAAKApvjO6z8xNw/ONAJQjvAfH9hsQxIAAgACQAByImbOeAJQ/Pn+K21GAkAAQAAIQM6sTP36AKkLwPU2IQEgACAABKAgricAxV3nf6cNSAAIAAgAASiInSnfLyDV8D8y8JrNRwAIAAgAASiYmEVHEoD8BOB+m44AEAAQAAJQEu4nAPmE/1SbjQAQABAAAlAyphKA7ob/uMCHNhoBIAAgAASgZMRsGkcAuicAy20yAkAAQAAIQElZTgC6E/4X2FwEgACAABCAknMBAehs+I8JrLexCAABAAEgACUnZtUYAtA5AXjApiIABAAEgAAkwgMEoDPhPyUwYEMRAAIAAkAAEiFm1hQCMLTwHx543WZKRwCu77u3sfTfVibNsz98UGhWjDU/SH9fxmOLACRFzK7hBKB9AbjDJkpLAB75X080kq9frRaaVeMX/zv5bRmPLQKQHHcQgPbC/+TALhuIABAAEAACkCgxw04mAK2F/+GBF20eAkAAQAAIQOLELDucADQvANfZNASAAIAAEICKcB0BaC78jwv02zAEgACAABCAihAz7TgCcGgBWGyzEAACAAJAACrGYgJw8PA/wyYhAAQABIAAVJQzCMDg4X9YYLUNQgAIAAgAAagoMeMOIwCfF4CZNgcBIAAgAASg4swkAJ8O/1GBDTYGASAAIAAEoOLErBtFAP4sAH02BQEgACAABKAm9BGAP4b/hMDHNgQBIAAgAASgJsTMm0AA3l6yzGYgAKWq999pNOLdPFEd3vwNASAAZWNZrQUgu9WvjUAAlFIEoI5MqaUAhB+8J7DWBiAASikCUFNiBvbUUQCmW3wCoJQiADVneq0EIPzAwwJvWHgCoJQiADUnZuGwOgnALItOAJRSBAB7mVULAQg/aG/gXQtOAJRSBAB7iZnYWwcBuMpiEwClFAHAp7iq0gIQfsDhgfctNAFQShEAfIqYjcOrLADXWmQCoJQiABiUayspAOEHGxnYaIEJgFKKAGBQYkaOrKIA3GBxCYBSigDgoNxQKQEIP9DowCYLSwCUUgQAByVm5egqCcDNFpUAKKUIAJri5koIQPbe/2YLSgCUUgQATbE5j88C5CEAV1tMAqCUIgBoiauTFoDwAxweeMtCEgClFAFAS8TsPDxlAbjIIhIApRQBQFtclLIAPG8BCYBSigCgLZ5PUgDCC59s8QiAUooAYEhMTlEAHrVwBEApRQAwJB5NSgDCCz4hsMfCEQClFAHAkIhZekJKAjDPohEApRQBQEeYl4QAhBc6NrDdghEApRQBQEeImTo2BQFw2V8CoJQiACj55YE7Hf5HuOUvAVBKEQB05VbBR5RZAFz4hwCY1EoRACRwYaBOC8CTFogAKKUIALrCk6UUgPDCJgQGLBABUEoRAHSFmLETyigAt1kcAkAAlCIA6Cq3lUoAsrv+vW9hCAABUIoAoKu836m7BHZKAKZaFAJAAJQiAMiFqWUSgBUWhAAQAKUIAHJhRSkEILyQ8YHdFoQAEAClCAByIWbu+DIIgCv/EQACoBQBQGJXBhxq+PcE3rUQBIAAKEUAkCsxe3uKFIDzLAIBIABKEQAUwnlFCsAjFoAAEAClCAAK4ZFCBCA88YjANgtAAAiAUgQAhRAzeEQRAnCh5hMAAqAUAUChXFiEACzReAJAAJQiACiUJbkKQHjCkYF+jScABEApAoBCiVk8Mk8BuFjTCQABUIoAoBRcnKcALNdwAkAAlCIAKAXLcxGA8ERHBXZoOAEgAEoRAJSCmMlH5SEAl2o2ASAAShEAlIpL8xCAxzSaABAApQgASsVjXRWA8ARHBz7RaAJAAJQiACgVMZuP7qYAXK7JBIAAKEUAUEou76YALNNgAkAAlCIAKCXLuiIA4YGHBbZqMAEgAEoRAJSSmNHDuiEAZ2ouASAAKqUaIAAEoH6c2Q0B6NNYAkAAVCr14zf/0Pjuq79v7BkgAASgVvR1QwDWaCwBIAAqlfC/6JkP91IVCSAAaJI1HRWA8IDjAgMaSwAIgEop/KskAQQATRKzelwnBcDpfwSAAKjS148GCf+qSAABQKdPB2xWABZrKAEgACrV8K+CBBAAtMDijghAeKCewCYNJQAEQKUc/qlLAAFAC8TM7umEAJyumQSAAKiy1qIWwj9lCSAAaJHTOyEAczSSABAAVZXwT1UCCABaZE4nBOAFjSQABEBVKfxTlAACgBZ5YUgCEB5gdGCPRhIAAqCqFv6pSQABQIvE7B49FAE4VxMJQCoCsGnLtsZHm3+PirJr956Oh39KEkAA0AbnDkUAbtVAApCKAGz4f1sa6zduRkXZuWt3V8I/FQkgAGiDW4ciACs1kAAQAJSBheu2dS38U5AAAoA2WNmWAGS3/+3XQAJAAFA0c3/1UdfDv+wSQADQBv0Huz3wwQTgNM0jAAQARXNfjuFfZgkgAGiT09oRgNkaRwAIAOoW/mWVAAKANpndjgAs1TgCQABQx/AvowQQALTJ0nYEYIPGEQACgLqGf9kkgACgTTa0JADhGyZqGgEgAKh7+JdJAggAhsDEVgRghoYRAAIA4V8eCSAAGAIzWhGA+RpGAAgA8uTeEof/Pub9dhsBQIrMb0UAXtYwAkAAIPz/zKWrPmq8vGUnAUCKvNyUAIQv7A3s0jACUGUB+ODDLY09e/agQH73+37hTwCQDzHTe5sRgEmaRQCqLwC/c0u9gmvrtn7hTwCQH5OaEYDpGkUACIDqdt3/6hbhTwCQH9ObEYC7NIoAEADVzXpw3R+EPwFAvtzVjAA8rlEEgAAo4b+zVH0jABgijzcjAOs1igAQAFXn8H+lZOFPANAB1h9UAMIXjNUkAkAAlPBvEABzs4qMPZgAnK1BBIAAqE7XAuFPAFAGzj6YAFyjQQSAACjhTwDMzUpyzcEEYIEGEQACoGoV/v9e/vAnAOgQCw4mAKs1iAAQANWJ+pd125II/18nEP4EAB1i9aACEP5HT2C7BhEAAqCEPwEwNytJzPiewQTgeM0hAARACX8CQAAqzfGDCcAUjSEABEANKfxfF/4EACVnymACcIXGEAACoIQ/ASAAleaKwQRgjsYQAAKgKh3+v9uZbI8JADrEnMEEYJHGEAACoFqtB4Q/AUBKLBpMAFZpDAEgAKrZGhD+BAApsmowAXhPYwgAAVDNhv984U8AkCLvfUoAwj/0BvZoDAEgAPnVLzd90vhNguEk/AkAkiZmfe/+AjBRUwgAAcg3/C9Z9VHjshBSKUlASuH/aoXCnwCgw0zcXwDO0RACQADyDf99YZWKBKQS/pdVMPwJADrMOfsLwCwNIQAEIP/wT0UChD8BQKWYtb8A3K4hBIAAdLfWHCD8yy4Bwp8AoHLcvr8APKwhBIAAFBf+ZZWAGP4/+K3wJwCoGA/vLwBPaQgBIADFhn/ZJCCl8P9NxcOfAKDDPLW/AKzVEAJAADpfL7UY/mUJNeFPAMzNSrN2fwFwESACQABKEv5Fh1sM//uFPwEwNyt/MaB9ArBdQwgAAShP+BcVcsKfABCAWrB9rwCE/xihGQSAAHQw/D/qTPjnHXbCnwAQgFoxIgrAeI0gAASgc+H/pZ+lF3rCnwAQgNoxPgrAJI0gAASgvOHf7fAT/gSAANSSSVEAztYIAkAAyh3+3QrBVML/0lUfNl7Z9HGjzkUA0GHOjgIwTSMIAAFov17MKfw7LQEx/OclEv4/f2dTY+eu3QSAAKBzTIsCcKVGEAACkEb4d0oCUgv/uGYEgACgo1wZBeBGjSAABCCd8B+qBKQU/r/Iwp8AEAB0nBujANytEQSAALRWqwsO/3YlINXwJwAEAB3n7igAD2kEASAA6YV/qxIQw3/ua2mGPwEgAOg4D0UBWKoRBIAApBn+zUpA6uFPAAgAOs7SKAArNIIAEIB0w/9QElCF8CcABAAdZ0UUgCc0ggAQgEPXg+v+kNzFcqoS/gSAAKDjPBEF4BmNIAAEoLkP0M1/PZ0r5lUp/AkAAUDHeSYKwHMaQQAIQPUk4I6Xt1Ym/AkAAUDHeS4KwEsaQQAIQPUkIAVJaTb8CQABQMd5KQrAKxpBAAgACciT6SH813ywren1IgAEAB3nlSgA6zSCABCA9iTgARLQVvj/duuuxtZt/QSAAKA41kUBeFcjCAABIAF5hn8sAkAAUCjvRgH4QCMIAAEgAXmGPwEgACicD6IAbNEIAkAAhl4koPnwJwAEAIWzJQpAv0YQAAJAAvIMfwJAAFA4/VEAdmsEASAAJCDP8CcABACFs5sAEAAC0IX6FxKwN/xfP0D4EwACgHIIgLcACAABIAG5hj8BIAAox1sAPgRIAAgACcg1/AkAAUA5PgToNEACQABIQEeY8fPmwp8AEACU4zRAFwIiAASABOQa/gSAAKAcFwJyKWACQABIQK7hTwAIAMpxKWA3AyIABIAEDCn81/1+V8u9IAAEAMXfDMjtgAkAAchTAtZtq334EwACgHLcDvg5jSAABIAE5Bn+BIAAoHCeiwLwjEYQAAJAAvIMfwJAAFA4z0QBeEIjCAABIAF5hj8BIAAonCeiAKzQCAJAAEhAnuFPAAgACmdFFIClGkEACAAJyDP8CQABQOEsjQLwkEYQAAJQfC1Y94fShv/lHQ5/AkAAUDgPRQG4WyMIAAEgAXmGPwEgACicu6MA3KgRBIAAkIA8w58AEAAUzo1RAK7UCAJAAEhAnuFPAAgACufKKADTNIIAEAAS8Nnwf6OL4U8ACAAKZ1oUgLM1ggAQgHLWgwVIQB7hTwAIAArn7CgAkzSCABAAEpBn+BMAAoDCmRQFYLxGEAACQALyDH8CQABQOOOjAIzQCAJAAOotAXmHPwEgACicEX8R9lWUgO2aQQAIQD0lIIb/mzmHPwEgACiU7TH79wnAexpCAAhA/SSgqPAnAAQAhfLe/gKwVkMIAAGolwQUGf4EgACgUNbuLwBPaQgBIAD1kYCiw58AEAAUylP7C8DDGkIACEA9JKAM4U8ACAAK5eH9BeB2DSEABKD6ElCW8CcABACFcvv+AjBLQwgAAai2BOwN/227SvOaCQABQGHM2l8AztEQAkAAqisBZQt/AkAAUCjn7C8AEzWEABCA9GvhG39IIvwJAAFAoUzcXwB6A3s0hQAQgGpJQFnDnwAQABRGzPrePwlAw8WACAABqJwElDn8CQABQLEXAfqsAKzSGAJAAKpTH328p9SvjwAQABTCqsEEYJHGEAACoAgAASAAlWbRYAIwR2MIAAFQBIAAEIBKM2cwAbhCYwgAAVAEgAAQgEpzxWACMEVjCAABUASAABCASjNlMAE4XmMIAAFQBIAAEIBKc/xgAtAT2K45BIAAKAJAAMzNShIzvudzApBJwGoNIgAEQBEAAmBuVpLV+2f+ZwVggQYRAAKgCAABMDcryYKDCcA1GkQACIAiAATA3Kwk1xxMAM7WIAJAABQBIADmZiU5+2ACMFaDCAABUASAAJiblWTsAQUgk4D1mkQAqi4A8Wu37/gEBbJpyzYCQACQH+s/m/eDCcDjGkUAqi4ASA8CQAAwJB5vRgDu0igCQABAAAgAKsVdzQjAdI0iAAQABIAAoFJMb0YAJmkUASAAIAAEAJViUjMC0BvYpVkEgACAABAAVIKY6b2HFIBMAl7WMAJAAEAACAAqwcuDZf2BBGC+hhEAAgACQABQCea3IgAzNIwAEAAQAAKASjCjFQGYqGEEgACAABAAVIKJTQtAJgEbNI0AEAAQAAKApNlwoJw/mAAs1TgCQABAAAgAkmZpOwIwW+MIQEoC4Pr61WbPngECQADQOrPbEYDTNI4ApCQAShEAAoDPcVo7AjAs0K95BIAAKEUAkCQxw4e1LACZBKzUQAJAAJQiAEiSlQfL+EMJwK0aSAAIgFIEAEly61AE4FwNJAAEQCkCgCQ5dygCMDqwRxMJAAFQigAgKWJ2j25bADIJeEEjCQABUIoAICleOFS+NyMAczSSABAApQgAkmJOJwTgdI0kAARAKQKApDi9EwLQE9ikmQSAAChFAJAEMbN7hiwAmQQs1lACQACUIgBIgsXNZHuzAnC5hhIAAqAUAUASXN5JARgXGNBUAkAAlCIAKDUxq8d1TAAyCVijsQSAAChFAFBq1jSb660IQJ/GEgACoBQBQKnp64YAnKmxBIAAKEUAUGrO7IYAxNsDb9VcAkAAlCIAKCVbD3b737YFIJOAZRpMAAiAUgQApWRZK5neqgA4HZAAEAClCAASPv2vXQE4OvCJJhMAAqAUAUCpiNl8dNcEIJOAxzSaABAApQgASsVjreZ5OwJwqUYTAAKgFAFAqbg0DwE4KrBDswkAAVCKAKAUxEw+qusCkEnAcg0nAARAKQKAUrC8nSxvVwAu1nACQACUIgAoBRfnKQAjA/2aTgAIgFIEAIUSs3hkbgKQScASjScABEApAoBCWdJujg9FAC7UeAJAAJQiACiUC4sQgBGBbZpPAAiAUgQAhRAzeETuApBJwCMWgAAQAKUIAArhkaFk+FAF4DwLQAAIgFIEAIVwXpEC0BN41yIQAAKgFAFArsTs7SlMADIJuNlCEAACoBQBQK7cPNT87oQAjA/sthgEgACoqtTTz61pPP1seVgZ+MadcwkA9hEzd3zhApBJwAoLQgAIgKpKvfHO+sb6jZtLw7d/8Ehu4U8AkmBFJ7K7UwIw1YIQAAKgCED64U8AkmBqmQTg8MD7FoUAEABFADrHXT94OPfwJwClJ2bt4aURgEwCbrMwBIAAKAKQdvgTgNJzW6dyu5MCMCEwYHEIgFIEYGh86/7iwp8AlJqYsRNKJwCZBDxpgQiAUgQg3fAnAKXmyU5mdqcF4CILRACUIgBthv+8Hxce/gSg1FxUZgE4IrDRIhEApQhAmuFPAEpLzNYjSisADVcGJAAEQBGApMOfAFT3yn95CMDYwHaLRQCUIgCH5s55PypV+BOAUhIzdWzpBSCTgHkWjAAoRQDSC38CUErmdSOruyUAJwT2WDQCoBQBGJw75pYz/AlA6YhZekIyApBJwKMWjgAoRQDSCn8CUDoe7VZOd1MAJls4AqAUAUgr/AlA6ZicnABkEvC8xSMAShGAP/LP9y0qffgTgFLxfDczutsC4MJABEApApBQ+BOA6l74J28BiHcJfMsiEgCl6iwAKYU/ASgNb3Xqrn+FCEAmAVdbSAKgVF0FILXwJwCl4epu53MeAjAysNliEgCl6iYAffc+lFz4E4BSEDNzZPIC0HB5YAKgVA0FINXwJwDVvOxvkQIwOrDJohIApeogACmHPwEonJiVoysjAJkE3GBhCYBSVReA2xMPfwJQODfklct5CsBItwomAEpVWQCqEP4EoPBb/o6snABkEnCtBSYASlVRAG7//g8rEf4EoFCuzTOT8xaA4YH3LTIBUKpKAlCl8CcAhRGzcXhlBSCTgKssNAFQqioCULXwJwCFcVXeeVyEAPQG3rXYBECp1AXgtu9VL/wJQCHETOytvABkEjDLghMApVIWgKqGPwEohFlFZHFRAjAs8IZFJwBKpSgA//S9hZUNfwKQOzELh9VGADIJmG7hCYBSqQlA1cOfAOTO9KJyuEgB6AmstfgEQKlUBKAO4U8AciVmYE/tBCCTgCk2AAFQKgUBuPW7D9Yi/AlArkwpMoMLFYBMApbZBARAqTILQJ3CnwDkxrKi87cMAjAh8LHNQACUKqMA3HpPvcKfAORCzLwJtReATAL6bAgCoFTZBKCO4U8AcqGvDNlbFgEYFdhgUxAApcoiAHUNfwLQdWLWjSIAn5aAmTZG+gIw70fLw29OHwJJc/N3Hqht+BOArjOzLLlbJgE4LLDa5khbAAAQAByQmHGHEYDBJeAMG4QAACAAFeWMMmVuqQQgk4DFNgkBAEAAKsbisuVtGQXguEC/zUIAABCAihAz7TgC0JwEXGfDEAAABKAiXFfGrC2rABweeNGmIQAACEDixCw7nAC0JgEnB3bZPAQAAAFIlJhhJ5c1Z0srAJkE3GEDEQAABCBR7ihzxpZdAIYHXreJCAAAApAYMbuGE4Ch3zJ4wGYiAAAIQCIMFH2r30oIQCYBD9hQBAAAAUiEB1LI1lQEYExgvU1FAAAQgJITs2oMAeisBFxgYxEAAASg5FyQSq4mIwCZBCy3uQgAAAJQUpanlKmpCcC4wIc2GQEAQABKRsymcQSguxIw1UYjAAAIQMmYmlqeJicAmQTcb7MRAAAEoCTcn2KWpioARwZes+kIAAACUDAxi44kAPlKwCmBnTYfAQBAAAoiZtApqeZosgKQScD1NiABAEAACuL6lDM0dQHoCay0CQkAAAKQMzF7eghAsRIwPrDZZiQAAAhATsTMGZ96fiYvAJkETLMhCQAAApAT06qQnZUQgEwCFtqUBAAAAegyC6uSm1USgFGBV21OAgCAAHSJmDGjCEA5JeDEwFablAAAIAAdJmbLiVXKzEoJQCYB5wcGbFYCAIAAdIiYKedXLS8rJwCZBPTZsAQAAAHoEH1VzMqqCkC8PsATNi0BAEAAhsgTqZ/vXysByCTgmMA7Ni8BAEAA2iRmyDFVzcnKCsB+9wvYYRMTAAAEoEV2pHyd/9oLQCYBM21kAgCAALTIzKrnY+UFIJOAuQSAAAAgAE0ytw7ZWBcB6A08SwAMNgAE4BDErOglANWSgGMDbxMAACAAByBmxLF1ycXaCEAmAScFthAAACAAnyFmw0l1ysRaCUAmAWcFdhIAACAAGTETzqpbHtZOADIJmEEAAIAAZMyoYxbWUgAyCbiFAABA7QXglrrmYG0FIJOARQQAAGorAIvqnIF1F4B4euDTBAAAaicAT9fldD8CcGAJGBN4lQAAQG0EIM78MXXPv9oLQCYBEwIbCQAAVF4A4qyfIPsIwP4ScGpgKwEAQAAqKwBxxp8q8wjAYBIwOdBPAAAQgMrNwTjbJ8s6AnAwCfhC4GMCAIAAVIY4078g4whAMxLwxcCuKh0A//HSvzXYABySv5w6s/E/3/xplcI/zvIvyjYC0IoEXBLYU5WD4Iv/+HXDDcAhOe/q2VUK/zjDL5FpBKAdCZgVGKjCgfC1R79nuAE4JFcvvrsq4R9n9yxZRgCGIgGzq2LDX/rnbxpwAA7IhTd/o0q//c+WYQSgExJwU1UOiq/+9O7GF668unHa1JkGHoC9syDOhH945DtVCv+bZBcB6KQE3FmlDwXe/cZPG9969WEANSfOgop94v9OmUUASAAA1AvhTwC8HQAANcOf/QlAbh8MHHDAAUApPu3vA38EIPdTBPc4+ACg0PP8nepHAAq7WNAuByEAFHKFPxf5IQCFXzb4YwcjAOR6bX+X9yUApbmBUL+DEgByuaufG/sQgNLdSnirgxMAusZWt/QlAGWVgFMDGx2kANBx4mw9VdYQgDJLwITAqw5WAOgYcaZOkDEEIAUJGBN42kELAEMmztIxsoUApCQBvYFFDl4AaJs4Q3tlCgFIVQRucRADQMvcIkMIQBUkYEZgpwMaAA5JnJUzZAcBqJIEnBXY4uAGgAMSZ+RZMoMAVFECTgq87SAHgM8RZ+NJsoIAVFkCjg0862AHgD8RZ+KxMoIA1OUMgbkOegDYOwt90p8A1E4EZgZ2GAAAakicfTNlAQGoswScEnjHMABQI+LMO0UGEAAS8PaSYwJPGAoAakCcdceY/QQAf5aAnkBfYMCAAFBBBrIZ12PmEwAMLgLn3+O2wgCqRZxp55vxBACHloAT73FHQQDVIM6yE812AoDmJWBUYKHhASBh4gwbZaYTALQnAtMCmw0SAAkRZ9Y0M5wAYOgSMD6w0lABkABxVo03uwkAOnuWwPX3uKsggHKyM5tRPuVPANDFCwe9ZtgAKBGvubAPAUA+EnBk4H5DB0AJiLPoSLOZACBfEZga+NAAAlAAcfZMNYsJAIqTgHGB5YYRgByJM2ecGUwAUA4RuCCw3mAC0EXijLnAzCUAKJ8EjAk84H4CALpwHf84W8aYtQQA5RaBKYHXDS0AHSDOkilmKwFAOhIwPHBHYJcBBqANdmUzZLiZSgCQpgicHHjRMAPQAnFmnGyGEgCkLwGHB64L9BtsAA5CfzYrDjc7CQCqJQLHBRYbcgAGIc6G48xKAoBqi8AZgdUGHoBsFpxhNhIA1EcCDgvMDGwwAIFasiGbAYeZiQQA9RSBUYG+wMcGIlALPs6O+VFmIAEAoghMCCwzHIFKE4/xCWYeCAAOdBGhtQYlUCnWupgPCACakYCewPTAGwYnkDRvZMdyj9kGAoBWRGBYYFbgXYMUSIp3s2N3mFkGAoChiEBv4KrA+wYrUGrez47VXrMLBACdvr/AtYGNBi1QKjZmx6br9oMAoKsiMDJwQ2CTwQsUyqbsWBxpNoEAIE8RGB24ObDZIAZyZXN27I02i0AAUPRfBK4OvGkwA13lrexY8xs/CABKd9fBiwLPG9RAR3k+O7bcpQ8EAKWXgcmBRwN7DG+gLfZkx9BkMwUEACmKwAmBeYHtBjrQFNuzY+YEMwQEAFUQgbHZh5acQggc+FS+eIyMNTNAAFBFETgiey/zycCAoY+aM5AdC/GYOMKMAAFAne5AeJsrDKKmV+y7zZ35QADg7IG3l0wNrAjsFg6oKLuzPT7Vp/lBAIDPy8D47H1QNyBClW7ME/f0eMc4CABwaBGItyQ+L/BIYJsQQWJsy/bueW7FCwIAtC8DIwIXBpYE+oULSkp/tkfjXh3h2AUBADp/2eGLA8sDO4QOCmZHthcvdnleEAAgPxk4KnBp4LHAJ8IIOfFJtufi3jvKsQgCABQrA0cHLg8sC2wVUugwW7O9FffY0Y45EACgnDIwLHBmoC+wxgWH0OYFetZkeyjupWGOLRAAID0hGJf95rY4sEm44QBsyvZI3CvjHDsgAED1Ti88PTAn8IK7Fdb+bnsvZHvhdKfrgQAA9RKC0YFzA7cGVjrNsPKn6a3M1jqu+WjHAAgAgP0/P3BaYHZgaWCD4EyWDdkazs7W1Pv4AAEAWpKCiYEZgfmBlwO7hGvp2JWtzfxsrSbauwABADotBL2BSYHpgbsCjwfWC+HcWJ/1/K5sDeJa9NqbAAEAihKDsYGzA9cEFgRWB7YL7LbZnvVwQdbT2Nux9hpAAIBUzjo4PjAlcEX2ifNFgVWB92p+FsKerAersp7MyXo0JeuZT+UDBACo9NsJ8TMG5wRmBW4PPBx4KrA2C8jtif72/l72MzyV/Uy3Zz/jOdnP7M/2AAEAcAhRiHdEHJ+93x3/FD4tcGXgxsDdgYeyT7yvCDwReCbwXOClwCuBddl96T8IbMlOidud0Z/92wfZ16zLvuel7DGeyR5zRfYcD2XPeWP2GqZlr2lS9hrdCQ9IgP8PBmQVecblHcoAAAAASUVORK5CYII='
im = PIL.Image.open(BytesIO(base64.b64decode(data)))
im.save('report.png', 'PNG')

img = Image("photo", file="report.png")
root.tk.call('wm','iconphoto',root._w, img)

root.title('My Report Labor')
Application(root)
root.mainloop()