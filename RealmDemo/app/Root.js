import React,{Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
// import RealmHelloWolrd from './RealmHelloWorld';
import Realm from 'realm';


var realm = new Realm({
 schema: [{name: 'Dog',primaryKey: 'id', properties: {id: 'int',name: 'string',color: 'string'}}]
});

export default class Root extends Component{

  constructor(){
    super();
    this.state={
      datas: [],
    }
  }


  render() {
   return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column'}}>
      <TouchableOpacity style={{margin: 15,}} onPress={()=>this.save()}>
        <Text style={styles.style_text}>存储数据</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{margin: 15,}} onPress={()=>this.change()}>
        <Text style={styles.style_text}>更改数据</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{margin: 15,}} onPress={()=>this.delete()}>
        <Text style={styles.style_text}>删除数据</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'column'}}>
        {this.getItem(this.state.datas)}
      </View>
    </View>
   );
 }


 save = () => {
   realm.write(() => {
     let count = realm.objects('Dog').length;
     for(var i = count ; i < count+5 ; i++){
       realm.create('Dog', {id: i,name: 'Rex'+i,color: i%2===0?'黄色':'红色'});
       this.setState({
         datas: realm.objects('Dog'),
       })
       console.log('>>datas:'+this.state.datas);
     }
   });
 }

 change = () => {
      realm.write(() => {
      let count = realm.objects('Dog').length;
      if(count>0){
        for(var i = 0 ; i < count ; i++){
          if(i%2==0){
            realm.create('Dog',{id: i,name: 'er gou'},true);
          }
        }
        this.setState({
          datas: realm.objects('Dog'),
        });
      }
    });
  }

  delete = () => {
    realm.write(()=>{
      let dogs = realm.objects('Dog');
      let dog = dogs.filtered('id==1');
      realm.delete(dogs);
      this.setState({
        datas: realm.objects('Dog'),
      });
    })
  }



 getItem = (dogs) => {
   return(dogs.map((dog,i)=>{
     return(<Text style={{fontSize: 17,color: 'black'}} key={i}>{dog.name} is {dog.color}</Text>)
   }))
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    flex: 1,
  },
  style_text: {
    fontSize: 16,
    color: 'black',
  }
})
